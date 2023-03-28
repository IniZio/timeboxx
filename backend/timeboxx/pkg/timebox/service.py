from datetime import datetime
from typing import Any, Optional, cast

from sqlalchemy import delete, select, tuple_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.functions import coalesce

from timeboxx.pkg.db_models.task import Task
from timeboxx.pkg.db_models.timebox import Timebox
from timeboxx.pkg.timebox.models import TimeboxTask


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
                cast(
                    Any,
                    tuple_(
                        coalesce(Timebox.start_time, datetime.min),
                        coalesce(Timebox.end_time, datetime.max),
                    ).op("overlaps")(
                        tuple_(
                            cast(Any, start_time or datetime.min),
                            cast(Any, end_time or datetime.max),
                        )
                    ),
                )
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
        task: Optional[TimeboxTask] = None,
    ):
        timebox_task: Task = (
            await self.session.get(Task, task.id)
            if task and task.id
            else Task(
                id=Task.id_factory(),
                created_by_id=user_id,
                updated_by_id=user_id,
                client_id=task.client_id if task else None,
                title=task.title if task else title,
                description=task.description if task else description,
            )
        )
        self.session.add(timebox_task)
        assert timebox_task

        timebox = Timebox(
            id=Timebox.id_factory(),
            created_by_id=user_id,
            updated_by_id=user_id,
            client_id=client_id,
            title=title or timebox_task.title,
            description=description or timebox_task.description,
            start_time=start_time,
            end_time=end_time,
            task=timebox_task,
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
        task: Optional[TimeboxTask] = None,
        dirty_fields: Optional[list[str]] = None,
    ):
        timebox = await self.session.get(Timebox, id)

        if not timebox:
            return None

        timebox_task: Task = (
            await self.session.get(Task, task.id)
            if task and task.id
            else Task(
                id=Task.id_factory(),
                created_by_id=user_id,
                updated_by_id=user_id,
                client_id=task.client_id if task else None,
                title=task.title if task else title,
                description=task.description if task else description,
            )
        )

        timebox.task = timebox_task

        if not dirty_fields or "title" in dirty_fields:
            timebox.title = title or timebox_task.title  # type: ignore

        if not dirty_fields or "description" in dirty_fields:
            timebox.description = description or timebox_task.description  # type: ignore

        if not dirty_fields or "start_time" in dirty_fields:
            timebox.start_time = start_time  # type: ignore

        if not dirty_fields or "end_time" in dirty_fields:
            timebox.end_time = end_time  # type: ignore

        timebox.updated_by_id = user_id  # type: ignore

        return timebox

    async def delete_timebox(self, id: str):
        await self.session.execute(delete(Timebox).where(Timebox.id == id))
