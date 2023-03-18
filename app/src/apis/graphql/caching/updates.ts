import { UpdatesConfig } from "@urql/exchange-graphcache";

import {
  CreateTaskMutation,
  CreateTaskMutationVariables,
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
} from "@/apis/graphql/generated/graphql";
import { TasksScreenQuery } from "@/modules/tasks/screens/Tasks.screen";

export const updates: UpdatesConfig = {
  Mutation: {
    createTask(result: CreateTaskMutation, _vars: CreateTaskMutationVariables, cache) {
      cache.updateQuery({ query: TasksScreenQuery }, (data) => {
        data?.tasks.push(result.createTask);
        return data;
      });
    },
    deleteTask(result: DeleteTaskMutation, vars: DeleteTaskMutationVariables, cache) {
      if (result.deleteTask) {
        cache.updateQuery({ query: TasksScreenQuery }, (data) => {
          if (!data) return data;
          data.tasks = data.tasks.filter((t) => t.id !== vars.id);
          return data;
        });
      }
    },
  },
};
