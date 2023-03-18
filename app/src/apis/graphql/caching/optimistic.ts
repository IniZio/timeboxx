import { OptimisticMutationConfig } from "@urql/exchange-graphcache";

import { UpdateTaskMutation, UpdateTaskMutationVariables } from "@/apis/graphql/generated/graphql";

export const optimistic: OptimisticMutationConfig = {
  updateTask(vars: UpdateTaskMutationVariables, _cache, _info): Partial<UpdateTaskMutation["updateTask"]> {
    return {
      __typename: "Task",
      id: vars.input.id ?? undefined,
      title: vars.input.title,
      status: vars.input.status,
    };
  },
  deleteTask() {
    return true;
  },
};
