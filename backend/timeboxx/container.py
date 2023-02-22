from dependency_injector import containers, providers
from sqlalchemy.ext.asyncio import AsyncSession
from timeboxx.pkg.db import db_session

from timeboxx.pkg.task.service import TaskService


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(modules=[".healthz"])

    session = providers.Resource(db_session)

    task_service = providers.Factory(
        TaskService,
        session=session,
    )
