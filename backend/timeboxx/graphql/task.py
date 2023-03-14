from datetime import datetime
from enum import Enum
from typing import Optional

import strawberry

from timeboxx.graphql.mapper import sqlalchemy_mapper
from timeboxx.pkg import db_models


@strawberry.enum
class StrawberryTaskStatus(Enum):
    BACKLOG = "BACKLOG"
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"
    CANCELLED = "CANCELLED"


@sqlalchemy_mapper.type(db_models.Task)
class Task:
    __exclude__ = ["client_id"]

    status: Optional[StrawberryTaskStatus]


@strawberry.input
class CreateTaskInput:
    client_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    status: Optional[StrawberryTaskStatus] = None
