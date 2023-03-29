import logging
import time

from sqlalchemy import create_engine, event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import scoped_session, sessionmaker

from timeboxx.pkg.config import MainSettings

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def get_sessiomaker(settings: MainSettings):
    engine = create_engine(
        settings.DATABASE_URL,
        pool_size=50,
        max_overflow=10,
        future=True,
        echo=False,
    )
    session_factory = sessionmaker(
        bind=engine,
        autocommit=False,
        autoflush=False,
    )
    Session = scoped_session(session_factory)
    return Session


@event.listens_for(Engine, "before_cursor_execute")
def before_cursor_execute(conn, cursor, statement, parameters, context, executemany):
    conn.info.setdefault("query_start_time", []).append(time.time())
    # logger.debug("🛢 Start Query: %s", statement)


@event.listens_for(Engine, "after_cursor_execute")
def after_cursor_execute(conn, cursor, statement, parameters, context, executemany):
    total = time.time() - conn.info["query_start_time"].pop(-1)
    logger.debug(f"🛢 Finished Query:\n{statement}")
    logger.debug(f"🛢 Total Time: {total:.2f} sec")
