import strawberry

from timeboxx.graphql.task_mutation import TaskMutation
from timeboxx.graphql.timebox_mutation import TimeboxMutation


@strawberry.type
class Mutation(TimeboxMutation, TaskMutation):
    pass
