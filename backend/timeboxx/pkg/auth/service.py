import json
from contextlib import closing
from functools import cached_property
from urllib.request import urlopen

import jwt
from jwt import PyJWKClient
from sqlalchemy import select
from sqlalchemy.orm import Session

from timeboxx.pkg.auth.authgear_admin import AuthgearAdminAPI
from timeboxx.pkg.config import MainSettings
from timeboxx.pkg.db_models.user import User
from timeboxx.pkg.performance import performance_stack_factory


class AuthService:
    def __init__(
        self,
        session: Session,
        settings: MainSettings,
        authgear_admin: AuthgearAdminAPI,
    ) -> None:
        self.settings = settings
        self.session = session
        self.authgear_admin = authgear_admin

    @cached_property
    def jwks_client(self):
        doc_url = self.settings.AUTHGEAR_ENDPOINT + "/.well-known/openid-configuration"
        with closing(urlopen(doc_url)) as f:
            doc = json.load(f)
        jwks_uri = doc["jwks_uri"]
        if not jwks_uri:
            raise Exception("Failed to fetch jwks uri.")
        return PyJWKClient(jwks_uri, cache_keys=True)

    def _parse_header(self, authz_header: str):
        parts = authz_header.split(" ")
        if len(parts) != 2:
            return

        scheme = parts[0]
        if scheme.lower() != "bearer":
            return

        return parts[1]

    async def get_current_user(self, headers: dict[str, str]) -> User | None:
        perf_stack = performance_stack_factory("get_current_user")

        token = self._parse_header(headers.get("Authorization", ""))

        if not token:
            return None

        async with perf_stack.start_block("decode_jwt"):
            try:
                signing_key = self.jwks_client.get_signing_key_from_jwt(token)
                user_data = jwt.decode(
                    token,
                    signing_key.key,
                    algorithms=["RS256"],
                    audience=self.settings.AUTHGEAR_ENDPOINT,
                    options={"verify_exp": True},
                )
            except:
                return None

        authgear_id = user_data["sub"]

        user = self.session.scalar(select(User).where(User.authgear_id == authgear_id))

        if user is None:
            # This risks stale user info if the user is updated in Authgear,
            # but authgear query is simply too slow (~1s) so will just skip it if possible.
            async with perf_stack.start_block("query_user_node"):
                authgear_user = self.authgear_admin.query_user_node(
                    authgear_id=authgear_id
                )

            if not authgear_user:
                return None

            user = User(
                authgear_id=authgear_user.id,
                name=authgear_user.name,
                email=authgear_user.email,
            )
            self.session.add(user)
            self.session.commit()

        perf_stack.dump_metric()

        return user
