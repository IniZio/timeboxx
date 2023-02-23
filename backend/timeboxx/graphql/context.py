from dataclasses import dataclass

from strawberry.fastapi import BaseContext
from strawberry_sqlalchemy_mapper import StrawberrySQLAlchemyLoader

from timeboxx.pkg.task.service import TaskService


@dataclass
class Context(BaseContext):
    sqlalchemy_loader: StrawberrySQLAlchemyLoader
    task_service: TaskService
