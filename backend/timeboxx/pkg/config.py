import os
from dataclasses import dataclass


@dataclass()
class Settings:
    DATABASE_URL = os.environ.get("DATABASE_URL", "")
    DATABASE_SCHEMA = os.environ.get("DATABASE_SCHEMA", "")

    AUTHGEAR_ENDPOINT = os.environ.get("AUTHGEAR_ENDPOINT", "")
    AUTHGEAR_ADMIN_API_ENDPOINT = os.environ.get("AUTHGEAR_ADMIN_API_ENDPOINT", "")
    AUTHGEAR_ADMIN_API_KEY_ID = os.environ.get("AUTHGEAR_ADMIN_API_KEY_ID", "")
    AUTHGEAR_ADMIN_API_KEY = os.environ.get("AUTHGEAR_ADMIN_API_KEY", "")
    AUTHGEAR_APP_ID = os.environ.get("AUTHGEAR_APP_ID", "")

    @property
    def ASYNC_DATABASE_URL(self):
        return self.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

    APP_URL = os.environ.get("APP_URL", "")

    @property
    def CORS_ORIGINS(self) -> list[str]:
        return [self.APP_URL]


settings = Settings()
