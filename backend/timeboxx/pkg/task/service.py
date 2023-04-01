from datetime import datetime
from typing import Optional

from sqlalchemy import delete, or_, select
from sqlalchemy.orm import Session

from timeboxx.pkg.db_models.task import Task, TaskStatus


class TaskService:
    def __init__(self, session: Session) -> None:
        self.session = session

    async def list_tasks(
        self, user_id: str, keyword: Optional[str] = None
    ) -> list[Task]:
        tasks_q = (
            select(Task)
            .where(Task.created_by_id == user_id)
            .order_by(Task.created_at.desc())
        )
        if keyword:
            tasks_q = tasks_q.filter(
                or_(Task.title.contains(keyword), Task.description.contains(keyword))
            )

        results = self.session.scalars(tasks_q)

        return list(results.all())

    async def create_task(
        self,
        user_id: Optional[str] = None,
        client_id: Optional[str] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        deadline: Optional[datetime] = None,
        status: Optional[TaskStatus] = None,
    ) -> Task:
        task = Task(
            id=Task.id_factory(),
            created_by_id=user_id,
            updated_by_id=user_id,
            client_id=client_id,
            title=title,
            description=description,
            start_time=start_time,
            end_time=end_time,
            deadline=deadline,
            status=status.value if status else None,
        )

        self.session.add(task)
        return task

    async def update_task(
        self,
        user_id: Optional[str] = None,
        id: Optional[str] = None,
        client_id: Optional[str] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        deadline: Optional[datetime] = None,
        status: Optional[TaskStatus] = None,
        dirty_fields: Optional[list[str]] = None,
    ) -> Optional[Task]:
        find_task_stmt = select(Task)

        if client_id and id:
            find_task_stmt = find_task_stmt.where(
                or_(Task.id == id, Task.client_id == client_id)
            )
        elif client_id:
            find_task_stmt = find_task_stmt.where(Task.client_id == client_id)
        elif id:
            find_task_stmt = find_task_stmt.where(Task.id == id)
        else:
            raise ValueError("Either id or client_id is required to update timebox")

        timebox = self.session.scalar(find_task_stmt)

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

        if not dirty_fields or "deadline" in dirty_fields:
            timebox.deadline = deadline  # type: ignore

        if not dirty_fields or "status" in dirty_fields:
            timebox.status = status  # type: ignore

        timebox.updated_by_id = user_id  # type: ignore

        return timebox

    async def delete_task(self, id: str):
        self.session.execute(delete(Task).where(Task.id == id))
