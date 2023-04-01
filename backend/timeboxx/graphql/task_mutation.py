from typing import Any, cast

import strawberry
from strawberry.types import Info

from timeboxx.graphql.context import Context
from timeboxx.graphql.task import CreateTaskInput, TaskType, UpdateTaskInput


@strawberry.type
class TaskMutation:
    @strawberry.field
    async def create_task(
        self,
        info: Info[Context, Any],
        input: CreateTaskInput,
    ) -> TaskType:
        current_user = await info.context.current_user
        task_service = info.context.task_service

        task = await task_service.create_task(
            user_id=current_user.id if current_user else None,
            client_id=input.client_id,
            title=input.title,
            description=input.description,
            start_time=input.start_time,
            end_time=input.end_time,
            deadline=input.deadline,
            status=input.status,
        )

        return cast(TaskType, task)

    @strawberry.field
    async def update_task(
        self,
        info: Info[Context, Any],
        input: UpdateTaskInput,
    ) -> TaskType:
        current_user = await info.context.current_user
        task_service = info.context.task_service

        task = await task_service.update_task(
            user_id=current_user.id if current_user else None,
            id=input.id,
            client_id=input.client_id,
            title=input.title,
            description=input.description,
            start_time=input.start_time,
            end_time=input.end_time,
            deadline=input.deadline,
            status=input.status,
            dirty_fields=input.dirty_fields,
        )

        return cast(TaskType, task)

    @strawberry.field
    async def delete_task(
        self,
        info: Info[Context, Any],
        id: str,
    ) -> bool:
        task_service = info.context.task_service

        await task_service.delete_task(id=id)

        return True
