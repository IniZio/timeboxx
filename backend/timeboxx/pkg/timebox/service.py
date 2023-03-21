from datetime import datetime
from typing import cast, Any, Optional

from sqlalchemy import delete, or_, select, tuple_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.functions import coalesce

from timeboxx.pkg.db_models.timebox import Timebox


class TimeboxService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def list_timeboxes(
        self,
        user_id: str,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
    ) -> list[Timebox]:
        stmt = (
            select(Timebox)
            .where(Timebox.created_by_id == user_id)
            .order_by(Timebox.start_time, Timebox.end_time)
            .order_by(Timebox.created_at)
            .filter(
                cast(Any, tuple_(
                    coalesce(Timebox.start_time, datetime.min),
                    coalesce(Timebox.end_time, datetime.max),
                ).op("overlaps")(tuple_(cast(Any, start_time or datetime.min), cast(Any, end_time or datetime.max))))
            )
        )

        return list(await self.session.scalars(stmt))

    async def create_timebox(
        self,
        user_id: Optional[str] = None,
        client_id: Optional[str] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
    ):
        timebox = Timebox(
            id=Timebox.id_factory(),
            created_by_id=user_id,
            updated_by_id=user_id,
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
        user_id: str | None = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        dirty_fields: Optional[list[str]] = None,
    ):
        find_timebox_stmt = select(Timebox)

        if client_id and id:
            find_timebox_stmt = find_timebox_stmt.where(
                or_(Timebox.id == id, Timebox.client_id == client_id)
            )
        elif client_id:
            find_timebox_stmt = find_timebox_stmt.where(Timebox.client_id == client_id)
        elif id:
            find_timebox_stmt = find_timebox_stmt.where(Timebox.id == id)
        else:
            raise ValueError("Either id or client_id is required to update timebox")

        timebox = await self.session.scalar(find_timebox_stmt)

        if not timebox:
            return None

        if not dirty_fields or "title" in dirty_fields:
            timebox.title = title  # type: ignore

        if not dirty_fields or "description" in dirty_fields:
            timebox.description = description  # type: ignore

        if not dirty_fields or "start_time" in dirty_fields:
            timebox.start_time = start_time  # type: ignore

        if not dirty_fields or "end_time" in dirty_fields:
            timebox.end_time = end_time  # type: ignore

        timebox.updated_by_id = user_id  # type: ignore

        return timebox

    async def delete_timebox(self, id: str):
        await self.session.execute(delete(Timebox).where(Timebox.id == id))
