import os
from dataclasses import dataclass


@dataclass()
class Settings:
    DATABASE_URL = os.environ.get("DATABASE_URL", "")
    DATABASE_SCHEMA = os.environ.get("DATABASE_SCHEMA", "")


settings = Settings()
