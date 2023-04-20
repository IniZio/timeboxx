from dependency_injector import containers, providers

from timeboxx.pkg.auth.authgear_admin import AuthgearAdminAPI
from timeboxx.pkg.auth.service import AuthService
from timeboxx.pkg.config import MainSettings, WebsiteSettings
from timeboxx.pkg.db import get_sessiomaker
from timeboxx.pkg.task.service import TaskService
from timeboxx.pkg.timebox.service import TimeboxService
from timeboxx.pkg.timeslot.service import TimeslotService


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[".healthz", ".website", ".graphql.router"]
    )

    settings = providers.Singleton(MainSettings.from_env)
    website_settings = providers.Singleton(WebsiteSettings.from_env)

    sessionmaker = providers.ThreadLocalSingleton(get_sessiomaker, settings=settings)
    session = providers.Resource(sessionmaker)

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

    timeslot_service = providers.Factory(
        TimeslotService,
        session=session,
    )
