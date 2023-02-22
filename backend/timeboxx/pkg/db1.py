from contextlib import AbstractAsyncContextManager
from typing import AsyncIterator, Callable

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from .config import settings

SessionContextManagerFactory = Callable[[], AbstractAsyncContextManager[AsyncSession]]


class Database:
    def __init__(self) -> None:
        self._engine = create_async_engine(
            settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://"),
            future=True,
        )
        self._async_session_factory = async_sessionmaker(
            bind=self._engine,
            class_=AsyncSession,
            autocommit=False,
            autoflush=False,
        )

    async def __call__(self) -> AsyncIterator[AsyncSession]:
        async with self._async_session_factory() as session:
            try:
                yield session
                await session.commit()
            except:
                await session.rollback()
                raise
            finally:
                await session.close()

    # @asynccontextmanager
    # async def _session(self):
    #     session = async_scoped_session(
    #         self._async_session_factory, scopefunc=current_task
    #     )
    #     try:
    #         yield session
    #         await session.commit()
    #     except:
    #         await session.rollback()
    #         raise
    #     finally:
    #         await session.close()

    # @property
    # def session(self) -> SessionContextManagerFactory:
    #     return self._session # type: ignore
