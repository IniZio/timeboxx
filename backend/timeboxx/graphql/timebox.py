from datetime import datetime
from typing import Optional

import strawberry

from timeboxx.graphql.mapper import sqlalchemy_mapper
from timeboxx.pkg import db_models


@sqlalchemy_mapper.type(db_models.Timebox)
class Timebox:
    __exclude__ = ["client_id"]


@strawberry.input
class CreateTimeboxInput:
    client_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None


@strawberry.input
class UpdateTimeboxInput:
    id: Optional[str] = strawberry.UNSET
    client_id: Optional[str] = strawberry.UNSET
    title: Optional[str] = strawberry.UNSET
    description: Optional[str] = strawberry.UNSET
    start_time: Optional[datetime] = strawberry.UNSET
    end_time: Optional[datetime] = strawberry.UNSET
