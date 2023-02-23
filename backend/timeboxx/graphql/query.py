import strawberry

from timeboxx.graphql.task_query import TaskQuery


@strawberry.type
class Query(TaskQuery):
    @strawberry.field
    def ping(self) -> str:
        return "pong"
