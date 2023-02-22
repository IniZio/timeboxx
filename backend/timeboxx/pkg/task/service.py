from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from timeboxx.pkg.db_models.task import Task


class TaskService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def list_tasks(self) -> list[Task]:
        results = await self.session.scalars(select(Task))
        return list(results.all())
