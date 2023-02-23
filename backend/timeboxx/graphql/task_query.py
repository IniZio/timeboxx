from typing import Any, cast

import strawberry
from strawberry.types import Info

from timeboxx.graphql.context import Context
from timeboxx.graphql.task import Task


@strawberry.type
class TaskQuery:
    @strawberry.field
    async def tasks(self, info: Info[Context, Any]) -> list[Task]:
        task_service = info.context.task_service

        tasks = await task_service.list_tasks()

        return cast(list[Task], tasks)
