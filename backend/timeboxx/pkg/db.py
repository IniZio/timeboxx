from asyncio import current_task
from contextlib import AbstractAsyncContextManager, asynccontextmanager
from typing import Callable

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_scoped_session,
    async_sessionmaker,
    create_async_engine,
)

from .config import settings

engine = create_async_engine(
    settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://"), future=True
)
async_session_factory = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    autocommit=False,
    autoflush=False,
)
Session = async_scoped_session(async_session_factory, scopefunc=current_task)


@asynccontextmanager
async def _db_session():
    session = Session()
    try:
        yield session
        await session.commit()
    except:
        await session.rollback()
        raise
    finally:
        await session.close()


SessionContextManagerFactory = Callable[[], AbstractAsyncContextManager[AsyncSession]]
db_session: SessionContextManagerFactory = _db_session
