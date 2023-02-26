import strawberry

from timeboxx.graphql.task_query import TaskQuery
from timeboxx.graphql.timebox_query import TimeboxQuery


@strawberry.type
class Query(TaskQuery, TimeboxQuery):
    @strawberry.field
    def ping(self) -> str:
        return "pong"
