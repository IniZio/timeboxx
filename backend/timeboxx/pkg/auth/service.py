import json
from contextlib import closing
from functools import cache
from urllib.request import urlopen

import jwt
from jwt import PyJWKClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from timeboxx.pkg.auth.authgear_admin import AuthgearAdminAPI
from timeboxx.pkg.config import MainSettings
from timeboxx.pkg.db_models.user import User


class AuthService:
    jwks_client: PyJWKClient

    def __init__(
        self,
        session: AsyncSession,
        settings: MainSettings,
        authgear_admin: AuthgearAdminAPI,
    ) -> None:
        self.settings = settings
        self.session = session
        self.authgear_admin = authgear_admin

    @cache
    def _fetch_jwks_uri(self):
        doc_url = self.settings.AUTHGEAR_ENDPOINT + "/.well-known/openid-configuration"
        with closing(urlopen(doc_url)) as f:
            doc = json.load(f)
        jwks_uri = doc["jwks_uri"]
        if not jwks_uri:
            raise Exception("Failed to fetch jwks uri.")
        return jwks_uri

    def _parse_header(self, authz_header: str):
        parts = authz_header.split(" ")
        if len(parts) != 2:
            return

        scheme = parts[0]
        if scheme.lower() != "bearer":
            return

        return parts[1]

    async def get_current_user(self, headers: dict[str, str]) -> User | None:
        token = self._parse_header(headers.get("Authorization", ""))

        if not token:
            return None

        try:
            jwks_client = PyJWKClient(self._fetch_jwks_uri())
            signing_key = jwks_client.get_signing_key_from_jwt(token)
            user_data = jwt.decode(
                token,
                signing_key.key,
                algorithms=["RS256"],
                audience=self.settings.AUTHGEAR_ENDPOINT,
                options={"verify_exp": True},
            )
        except:
            return None

        authgear_user = self.authgear_admin.query_user_node(
            authgear_id=user_data["sub"]
        )

        if not authgear_user:
            return None

        user = await self.session.scalar(
            select(User).where(User.authgear_id == authgear_user.id)
        )

        if user is None:
            user = User(
                authgear_id=authgear_user.id,
                name=authgear_user.name,
                email=authgear_user.email,
            )
            self.session.add(user)
            await self.session.commit()

        return user
