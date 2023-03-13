from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from timeboxx.pkg.db_models.task import Task


class TaskService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def list_tasks(self, user_id: str) -> list[Task]:
        results = await self.session.scalars(
            select(Task).filter(Task.created_by_id == user_id)
        )
        return list(results.all())

    async def create_task(self) -> Task:
        task = Task(title="ABC", description="")

        self.session.add(task)

        return task
