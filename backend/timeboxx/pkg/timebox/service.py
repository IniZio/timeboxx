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
        return timebox

    async def update_timebox(
        self,
        id: Optional[str] = None,
        client_id: Optional[str] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        dirty_fields: Optional[list[str]] = None,
    ):
        find_timebox_stmt = select(Timebox)

        if client_id and id:
            find_timebox_stmt = find_timebox_stmt.filter(
                or_(Timebox.id == id, Timebox.client_id == client_id)
            )
        elif client_id:
            find_timebox_stmt = find_timebox_stmt.filter(Timebox.client_id == client_id)
        elif id:
            find_timebox_stmt = find_timebox_stmt.filter(Timebox.id == id)
        else:
            raise ValueError("Either id or client_id is required to update timebox")

        find_timebox_result = await self.session.scalars(find_timebox_stmt)
        timebox = find_timebox_result.one()

        if not dirty_fields or "title" in dirty_fields:
            timebox.title = title  # type: ignore

        if not dirty_fields or "description" in dirty_fields:
            timebox.description = description  # type: ignore

        if not dirty_fields or "start_time" in dirty_fields:
            timebox.start_time = start_time  # type: ignore

        if not dirty_fields or "end_time" in dirty_fields:
            timebox.end_time = end_time  # type: ignore

        return timebox
