from pydantic import BaseSettings


class Settings(BaseSettings):
    @classmethod
    def from_env(cls):
        return cls.parse_obj({})

    DATABASE_URL: str
    DATABASE_SCHEMA: str

    AUTHGEAR_ENDPOINT: str
    AUTHGEAR_ADMIN_API_ENDPOINT: str
    AUTHGEAR_ADMIN_API_KEY_ID: str
    AUTHGEAR_ADMIN_API_KEY: str
    AUTHGEAR_APP_ID: str

    @property
    def ASYNC_DATABASE_URL(self):
        return self.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

    APP_URL: str

    @property
    def CORS_ORIGINS(self) -> list[str]:
        return [self.APP_URL]


settings = Settings.from_env()
