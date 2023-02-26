from datetime import datetime
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from timeboxx.pkg.db_models.timebox import Timebox


class TimeboxService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def list_timeboxes(
        self, start_time: Optional[datetime] = None, end_time: Optional[datetime] = None
    ) -> list[Timebox]:
        stmt = select(Timebox).order_by(Timebox.start_time, Timebox.end_time)

        if start_time:
            stmt = stmt.filter(Timebox.start_time >= start_time)
        if end_time:
            stmt = stmt.filter(Timebox.end_time <= end_time)

        results = await self.session.scalars(stmt)

        return list(results.all())
