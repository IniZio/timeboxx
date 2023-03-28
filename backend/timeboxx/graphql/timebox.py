import strawberry

from timeboxx.graphql.mapper import sqlalchemy_mapper
from timeboxx.pkg import db_models
from timeboxx.pkg.timebox.models import CreateTimebox, TimeboxTask, UpdateTimebox


@sqlalchemy_mapper.type(db_models.Timebox)
class TimeboxType:
    __exclude__ = ["client_id"]


@strawberry.experimental.pydantic.input(model=TimeboxTask, all_fields=True)
class CreateTimeboxTaskInput:
    pass


@strawberry.experimental.pydantic.input(model=TimeboxTask, all_fields=True)
class UpdateTimeboxTaskInput:
    pass


@strawberry.experimental.pydantic.input(model=CreateTimebox, all_fields=True)
class CreateTimeboxInput:
    pass


@strawberry.experimental.pydantic.input(model=UpdateTimebox, all_fields=True)
class UpdateTimeboxInput:
    pass
