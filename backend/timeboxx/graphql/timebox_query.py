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
        timebox_service = info.context.timebox_service

        timeboxes = await timebox_service.list_timeboxes(
            start_time=start_time,
            end_time=end_time,
        )

        return cast(list[Timebox], timeboxes)
