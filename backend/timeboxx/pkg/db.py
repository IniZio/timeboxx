from contextlib import AbstractContextManager, contextmanager
from typing import Callable, Iterator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session as SASession
from sqlalchemy.orm import sessionmaker

from .config import settings

engine = create_engine(settings.DATABASE_URL, future=True)
Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)

SessionContextManagerFactory = Callable[[], AbstractContextManager[SASession]]


@contextmanager
def _db_session() -> Iterator[SASession]:
    session = Session()
    try:
        yield session
        session.commit()
    except:  # noqa
        session.rollback()
        raise
    finally:
        session.close()


db_session: SessionContextManagerFactory = _db_session
