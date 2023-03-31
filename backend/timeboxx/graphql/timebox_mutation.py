from typing import Any, cast

import strawberry
from strawberry.types import Info

from timeboxx.graphql.context import Context
from timeboxx.graphql.timebox import CreateTimeboxInput, TimeboxType, UpdateTimeboxInput


@strawberry.type
class TimeboxMutation:
    @strawberry.field
    async def create_timebox(
        self,
        info: Info[Context, Any],
        input: CreateTimeboxInput,
    ) -> TimeboxType:
        current_user = await info.context.current_user
        timebox_service = info.context.timebox_service

        model = input.to_pydantic()

        timebox: TimeboxType = await timebox_service.create_timebox(
            user_id=current_user.id if current_user else None,
            client_id=model.client_id,
            title=model.title,
            description=model.description,
            start_time=model.start_time,
            end_time=model.end_time,
            task=model.task,
        )

        return cast(TimeboxType, timebox)

    @strawberry.field
    async def update_timebox(
        self,
        info: Info[Context, Any],
        input: UpdateTimeboxInput,
    ) -> TimeboxType:
        current_user = await info.context.current_user
        timebox_service = info.context.timebox_service

        model = input.to_pydantic()
        dirty_fields = model.dirty_fields

        timebox = await timebox_service.update_timebox(
            user_id=current_user.id if current_user else None,
            id=model.id,
            client_id=model.client_id,
            title=model.title,
            description=model.description,
            start_time=model.start_time,
            end_time=model.end_time,
            task=model.task,
            dirty_fields=dirty_fields,
        )

        return cast(TimeboxType, timebox)

    @strawberry.field
    async def delete_timebox(
        self,
        info: Info[Context, Any],
        id: str,
    ) -> bool:
        timebox_service = info.context.timebox_service

        await timebox_service.delete_timebox(id=id)

        return True
