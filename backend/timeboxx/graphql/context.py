from dataclasses import dataclass
from typing import cast

from asyncstdlib.functools import cached_property
from strawberry.fastapi import BaseContext
from strawberry_sqlalchemy_mapper import StrawberrySQLAlchemyLoader

from timeboxx.pkg.auth.service import AuthService
from timeboxx.pkg.db_models.user import User
from timeboxx.pkg.task.service import TaskService
from timeboxx.pkg.timebox.service import TimeboxService


@dataclass
class Context(BaseContext):
    sqlalchemy_loader: StrawberrySQLAlchemyLoader
    task_service: TaskService
    timebox_service: TimeboxService
    auth_service: AuthService

    # TODO: Should move to middleware level
    @cached_property
    async def current_user(self) -> User | None:
        if not self.request:
            return None

        # HACK: We only use `.get` so treating it as dict for now
        dict_like_headers = cast(dict, self.request.headers)

        return await self.auth_service.get_current_user(dict_like_headers)
