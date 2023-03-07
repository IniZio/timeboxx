import base64
from typing import Any

from pydantic import BaseModel, Field


def encode_authgear_user_id(authgear_id: str) -> str:
    formatted_id = f"User:{authgear_id}"
    encoded = (
        base64.urlsafe_b64encode(formatted_id.encode("utf-8"))
        .decode("utf-8")
        .rstrip("=")
    )

    return encoded


def decode_authgear_user_id(node_id: str) -> str:
    decode = base64.urlsafe_b64decode(node_id + "==").decode("utf-8")
    # decoded format: "User:9acc8389-0e44-4c5e-a2bf-ebc3876a35d8"
    return decode.split(":")[1]


class AuthgearUser(BaseModel):
    node_id: str = Field(alias="id")
    standard_attributes: dict[str, Any] = Field(alias="standardAttributes")

    @property
    def id(self) -> str:
        return decode_authgear_user_id(self.node_id)

    @property
    def email(self) -> str | None:
        return self.standard_attributes.get("email")

    @property
    def name(self) -> str | None:
        return self.standard_attributes.get("name")
