import strawberry

from timeboxx.graphql.timebox_mutation import TimeboxMutation


@strawberry.type
class Mutation(TimeboxMutation):
    pass
