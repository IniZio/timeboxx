from dependency_injector import containers, providers
from fastapi_async_sqlalchemy import db

from timeboxx.pkg.task.service import TaskService
from timeboxx.pkg.timebox.service import TimeboxService


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[".healthz", ".graphql.router"]
    )

    session = providers.Resource(lambda: db.session)

    task_service = providers.Factory(
        TaskService,
        session=session,
    )

    timebox_service = providers.Factory(
        TimeboxService,
        session=session,
    )
