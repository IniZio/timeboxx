from __future__ import annotations

import time
from typing import Any, Optional

import jwt
import requests
from pydantic import BaseModel

from timeboxx.pkg.auth.models import AuthgearUser, encode_authgear_user_id
from timeboxx.pkg.config import Settings


class AuthgearAdminAPI:
    def __init__(
        self,
        settings: Settings,
    ) -> None:
        self.access_token = ""
        self.exp = 0
        self.endpoint = settings.AUTHGEAR_ADMIN_API_ENDPOINT
        self.key = settings.AUTHGEAR_ADMIN_API_KEY
        self.key_id = settings.AUTHGEAR_ADMIN_API_KEY_ID
        self.app_id = settings.AUTHGEAR_APP_ID

    def _refresh_token(self) -> None:
        iat = int(time.time())
        exp = int(time.time()) + 30 * 60
        self.access_token = jwt.encode(
            {
                "aud": self.app_id,
                "iat": iat,
                "exp": exp,
            },
            self.key,
            algorithm="RS256",
            headers={
                "typ": "JWT",
                "alg": "RS256",
                "kid": self.key_id,
            },
        )
        self.exp = exp

    def _get_access_token(self) -> str:
        now = int(time.time())
        if now > self.exp:
            self._refresh_token()
        return self.access_token

    def query_user_node(self, authgear_id: str) -> Optional[AuthgearUser]:
        query = """
        query ($id: ID!) {
            node(id: $id) {
                id
                ... on User {
                    standardAttributes
                }
            }
        }
        """
        variables = {"id": encode_authgear_user_id(authgear_id)}

        resp = self._request_graphql(query, variables)

        return QueryAuthgearUserNodeResponse.parse_obj(resp).node

    def _request_graphql(self, query: str, variables: dict[str, Any]) -> Any:
        body = {"query": query, "variables": variables}
        headers = {
            "Authorization": f"Bearer {self._get_access_token()}",
            "Content-Type": "application/json",
        }
        request = requests.post(
            self.endpoint,
            json=body,
            headers=headers,
        )
        if request.status_code == 200:
            response_body = request.json()
            if "errors" in response_body:
                raise Exception(f"{response_body['errors']}")
            return response_body["data"]

        raise Exception(f"{request.status_code} {body} {request} {headers}")


class QueryAuthgearUserNodeResponse(BaseModel):
    node: Optional[AuthgearUser]
