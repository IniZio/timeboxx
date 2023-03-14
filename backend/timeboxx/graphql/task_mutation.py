from typing import Any, cast

import strawberry
from strawberry.types import Info

from timeboxx.graphql.context import Context
from timeboxx.graphql.task import CreateTaskInput, Task


@strawberry.type
class TaskMutation:
    @strawberry.field
    async def create_task(
        self,
        info: Info[Context, Any],
        input: CreateTaskInput,
    ) -> Task:
        current_user = await info.context.current_user
        task_service = info.context.task_service

        task = await task_service.create_task(
            user_id=current_user.id if current_user else None,
            client_id=input.client_id,
            title=input.title,
            description=input.description,
            start_time=input.start_time,
            end_time=input.end_time,
            status=input.status,  # type: ignore
        )

        return cast(Task, task)
