from typing import Any, cast

import strawberry
from strawberry.types import Info

from timeboxx.graphql.context import Context
from timeboxx.graphql.timebox import CreateTimeboxInput, Timebox


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
