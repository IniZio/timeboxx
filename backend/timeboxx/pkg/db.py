from asyncio import current_task

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_scoped_session,
    async_sessionmaker,
    create_async_engine,
)

from timeboxx.pkg.config import MainSettings


def get_sessiomaker(settings: MainSettings):
    engine = create_async_engine(
        settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://"),
        pool_size=50,
        max_overflow=10,
        future=True,
    )
    async_session_factory = async_sessionmaker(
        bind=engine,
        class_=AsyncSession,
        autocommit=False,
        autoflush=False,
    )
    Session = async_scoped_session(async_session_factory, scopefunc=current_task)
    return Session
