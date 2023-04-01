from datetime import datetime
from typing import Optional

import strawberry

from timeboxx.graphql.mapper import sqlalchemy_mapper
from timeboxx.pkg import db_models

TaskStatus = strawberry.enum(db_models.Task.Status)


@sqlalchemy_mapper.type(db_models.Task)
class TaskType:
    __exclude__ = ["client_id"]

    status: Optional[TaskStatus]


@strawberry.input
class CreateTaskInput:
    client_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    deadline: Optional[datetime] = None
    status: Optional[TaskStatus] = None


@strawberry.input
class UpdateTaskInput:
    id: Optional[str] = None
    client_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    deadline: Optional[datetime] = None
    status: Optional[TaskStatus] = None
    dirty_fields: Optional[list[str]] = None
