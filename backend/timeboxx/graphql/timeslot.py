from typing import Optional
import strawberry

from timeboxx.graphql.mapper import sqlalchemy_mapper
from timeboxx.pkg import db_models
from timeboxx.pkg.timeslot.models import CreateTimeslot, UpdateTimeslot

TimeslotStatus = strawberry.enum(db_models.Timeslot.Status)


@sqlalchemy_mapper.type(db_models.Timeslot)
@strawberry.type
class TimeslotType:
    __exclude__ = ["client_id"]

    status: Optional[TimeslotStatus]


@strawberry.experimental.pydantic.input(model=CreateTimeslot, all_fields=True)
class CreateTimeslotInput:
    pass

@strawberry.experimental.pydantic.input(model=UpdateTimeslot, all_fields=True)
class UpdateTimeslotInput:
    status: Optional[TimeslotStatus] = None
