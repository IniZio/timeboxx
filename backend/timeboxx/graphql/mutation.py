import strawberry

from timeboxx.graphql.task_mutation import TaskMutation
from timeboxx.graphql.timebox_mutation import TimeboxMutation
from timeboxx.graphql.timeslot_mutation import TimeslotMutation


@strawberry.type
class Mutation(TimeboxMutation, TaskMutation, TimeslotMutation):
    pass
