from timeboxx.graphql.mapper import sqlalchemy_mapper
from timeboxx.pkg import db_models


@sqlalchemy_mapper.type(db_models.Timebox)
class Timebox:
    __exclude__ = ["client_id"]
