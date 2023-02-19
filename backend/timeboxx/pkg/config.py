import os
from dataclasses import dataclass


@dataclass()
class Settings:
    DATABASE_URL = os.environ.get("DATABASE_URL", "")
    DATABASE_SCHEMA = os.environ.get("DATABASE_SCHEMA", "")

    APP_URL = os.environ.get("APP_URL", "")

    @property
    def CORS_ORIGINS(self) -> list[str]:
        return [self.APP_URL]


settings = Settings()
