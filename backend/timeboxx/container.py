from dependency_injector import containers, providers
from fastapi_async_sqlalchemy import db

from timeboxx.pkg.auth.authgear_admin import AuthgearAdminAPI
from timeboxx.pkg.auth.service import AuthService
from timeboxx.pkg.config import MainSettings
from timeboxx.pkg.task.service import TaskService
from timeboxx.pkg.timebox.service import TimeboxService


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[".healthz", ".graphql.router"]
    )

    settings = providers.Singleton(MainSettings.from_env)

    session = providers.ThreadLocalSingleton(lambda: db.session)

    authgear_admin = providers.Factory(AuthgearAdminAPI, settings=settings)

    auth_service = providers.Factory(
        AuthService,
        session=session,
        settings=settings,
        authgear_admin=authgear_admin,
    )

    task_service = providers.Factory(
        TaskService,
        session=session,
    )

    timebox_service = providers.Factory(
        TimeboxService,
        session=session,
    )
