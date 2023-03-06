from typing import Any, cast

import strawberry
from strawberry.types import Info

from timeboxx.graphql.context import Context
from timeboxx.graphql.timebox import CreateTimeboxInput, Timebox, UpdateTimeboxInput


@strawberry.type
class TimeboxMutation:
    @strawberry.field
    async def create_timebox(
        self,
        info: Info[Context, Any],
        input: CreateTimeboxInput,
    ) -> Timebox:
        timebox_service = info.context.timebox_service

        timebox: Timebox = await timebox_service.create_timebox(
            client_id=input.client_id,
            title=input.title,
            description=input.description,
            start_time=input.start_time,
            end_time=input.end_time,
        )

        return cast(Timebox, timebox)

    @strawberry.field
    async def update_timebox(
        self,
        info: Info[Context, Any],
        input: UpdateTimeboxInput,
    ) -> Timebox:
        timebox_service = info.context.timebox_service

        dirty_fields: list[str] = []

        if input.id is not strawberry.UNSET:
            dirty_fields.append("id")
        if input.client_id is not strawberry.UNSET:
            dirty_fields.append("client_id")
        if input.title is not strawberry.UNSET:
            dirty_fields.append("title")
        if input.description is not strawberry.UNSET:
            dirty_fields.append("description")
        if input.start_time is not strawberry.UNSET:
            dirty_fields.append("start_time")
        if input.end_time is not strawberry.UNSET:
            dirty_fields.append("end_time")

        timebox: Timebox = await timebox_service.update_timebox(
            id=input.id,
            client_id=input.client_id,
            title=input.title,
            description=input.description,
            start_time=input.start_time,
            end_time=input.end_time,
            dirty_fields=dirty_fields,
        )

        return cast(Timebox, timebox)

    @strawberry.field
    async def delete_timebox(
        self,
        info: Info[Context, Any],
        id: str,
    ) -> bool:
        timebox_service = info.context.timebox_service

        await timebox_service.delete_timebox(id=id)

        return True
