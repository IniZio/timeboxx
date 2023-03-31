from typing import Any, Optional, cast

import strawberry
from strawberry.types import Info

from timeboxx.graphql.context import Context
from timeboxx.graphql.task import TaskType


@strawberry.type
class TaskQuery:
    @strawberry.field
    async def tasks(
        self, info: Info[Context, Any], keyword: Optional[str] = None
    ) -> list[TaskType]:
        current_user = await info.context.current_user
        task_service = info.context.task_service

        if not current_user:
            return []

        tasks = await task_service.list_tasks(user_id=current_user.id, keyword=keyword)

        return cast(list[TaskType], tasks)
