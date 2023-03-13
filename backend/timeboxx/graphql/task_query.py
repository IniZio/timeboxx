from typing import Any, cast

import strawberry
from strawberry.types import Info

from timeboxx.graphql.context import Context
from timeboxx.graphql.task import Task


@strawberry.type
class TaskQuery:
    @strawberry.field
    async def tasks(self, info: Info[Context, Any]) -> list[Task]:
        current_user = await info.context.current_user
        task_service = info.context.task_service

        if not current_user:
            return []

        tasks = await task_service.list_tasks(user_id=current_user.id)

        return cast(list[Task], tasks)
