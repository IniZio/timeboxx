import { OptimisticMutationConfig } from "@urql/exchange-graphcache";

import {
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
  UpdateTimeboxMutation,
  UpdateTimeboxMutationVariables,
} from "@/apis/graphql/generated/graphql";

export const optimistic: OptimisticMutationConfig = {
  updateTimebox(vars: UpdateTimeboxMutationVariables, _cache, _info): Partial<UpdateTimeboxMutation["updateTimebox"]> {
    return {
      __typename: "TimeboxType",
      id: vars.input.id ?? undefined,
      title: vars.input.title,
      description: vars.input.description,
      startTime: vars.input.startTime,
      endTime: vars.input.endTime,
    };
  },
  deleteTimebox() {
    return true;
  },
  updateTask(vars: UpdateTaskMutationVariables, _cache, _info): Partial<UpdateTaskMutation["updateTask"]> {
    return {
      __typename: "TaskType",
      id: vars.input.id ?? undefined,
      title: vars.input.title,
      status: vars.input.status,
    };
  },
  deleteTask() {
    return true;
  },
};
