from datetime import datetime
from typing import Any, Optional, cast

import strawberry
from strawberry.types import Info

from timeboxx.graphql.context import Context
from timeboxx.graphql.timebox import Timebox


@strawberry.type
class TimeboxQuery:
    @strawberry.field
    async def timeboxes(
        self,
        info: Info[Context, Any],
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
    ) -> list[Timebox]:
        current_user = await info.context.current_user
        timebox_service = info.context.timebox_service

        if not current_user:
            return []

        timeboxes = await timebox_service.list_timeboxes(
            user_id=current_user.id,
            start_time=start_time,
            end_time=end_time,
        )

        return cast(list[Timebox], timeboxes)
