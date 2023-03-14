from datetime import datetime
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from timeboxx.pkg.db_models.task import Task, TaskStatus


class TaskService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def list_tasks(self, user_id: str) -> list[Task]:
        results = await self.session.scalars(
            select(Task).filter(Task.created_by_id == user_id)
        )
        return list(results.all())

    async def create_task(
        self,
        user_id: Optional[str] = None,
        client_id: Optional[str] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        status: Optional[TaskStatus] = None,
    ) -> Task:
        task = Task(
            created_by_id=user_id,
            updated_by_id=user_id,
            client_id=client_id,
            title=title,
            description=description,
            start_time=start_time,
            end_time=end_time,
            status=status.value if status else None,
        )

        self.session.add(task)

        return task
