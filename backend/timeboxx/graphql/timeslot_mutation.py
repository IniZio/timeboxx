from typing import Any, cast

import strawberry
from strawberry.types import Info

from timeboxx.graphql.context import Context
from timeboxx.graphql.timeslot import (
    CreateTimeslotInput,
    TimeslotType,
    UpdateTimeslotInput,
)


@strawberry.type
class TimeslotMutation:
    @strawberry.field
    async def create_timeslot(
        self,
        info: Info[Context, Any],
        input: CreateTimeslotInput,
    ) -> TimeslotType:
        current_user = await info.context.current_user
        timeslot_service = info.context.timeslot_service

        model = input.to_pydantic()

        timeslot: TimeslotType = timeslot_service.create_timeslot(
            task_id=model.task_id,
            user_id=current_user.id if current_user else None,
            title=model.title,
        )

        return cast(TimeslotType, timeslot)

    @strawberry.field
    async def update_timeslot(
        self,
        info: Info[Context, Any],
        input: UpdateTimeslotInput,
    ) -> TimeslotType:
        current_user = await info.context.current_user
        timeslot_service = info.context.timeslot_service

        model = input.to_pydantic()

        timeslot: TimeslotType = timeslot_service.update_timeslot(
            id=model.id,
            task_id=model.task_id,
            user_id=current_user.id if current_user else None,
            title=model.title,
            start_time=model.start_time,
            end_time=model.end_time,
            duration=model.duration,
            status=model.status,
            dirty_fields=model.dirty_fields,
        )

        return cast(TimeslotType, timeslot)
