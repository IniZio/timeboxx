from datetime import datetime
from typing import Optional

from sqlalchemy import or_, select
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
            stmt = stmt.filter(
                or_(Timebox.end_time <= end_time, Timebox.end_time.is_(None))
            )

        results = await self.session.scalars(stmt)

        return list(results.all())

    async def create_timebox(
        self,
        client_id: Optional[str] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
    ):
        timebox = Timebox(
            id=Timebox.id_factory(),
            client_id=client_id,
            title=title,
            description=description,
            start_time=start_time,
            end_time=end_time,
        )
        self.session.add(timebox)
        # FIXME: The middleware is not committing, why
        await self.session.commit()
        return timebox
