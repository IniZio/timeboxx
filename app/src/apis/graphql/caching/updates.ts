import { UpdatesConfig } from "@urql/exchange-graphcache";
import dayjs from "dayjs";

import {
  CreateTaskMutation,
  CreateTaskMutationVariables,
  CreateTimeboxMutation,
  CreateTimeboxMutationVariables,
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
  DeleteTimeboxMutation,
  DeleteTimeboxMutationVariables,
} from "@/apis/graphql/generated/graphql";
import { TasksScreenQuery } from "@/modules/tasks/screens/Tasks.screen";
import { TodayScreenQuery } from "@/modules/timeboxes/screens/Today.screen";

export const updates: UpdatesConfig = {
  Mutation: {
    // Timebox
    createTimebox(result: CreateTimeboxMutation, _vars: CreateTimeboxMutationVariables, cache) {
      const [todayStart, todayEnd] = [dayjs().startOf("day"), dayjs().endOf("day")];
      cache.updateQuery(
        { query: TodayScreenQuery, variables: { startTime: todayStart, endTime: todayEnd } },
        (data) => {
          if (!data) return data;
          data.timeboxes.push(result.createTimebox);
          data.timeboxes = data.timeboxes.sort((a, b) => a.startTime - b.startTime);
          return data;
        },
      );
    },
    deleteTimebox(result: DeleteTimeboxMutation, vars: DeleteTimeboxMutationVariables, cache) {
      if (result.deleteTimebox) {
        const [todayStart, todayEnd] = [dayjs().startOf("day"), dayjs().endOf("day")];
        cache.updateQuery(
          { query: TodayScreenQuery, variables: { startTime: todayStart, endTime: todayEnd } },
          (data) => {
            if (!data) return data;
            data.timeboxes = data.timeboxes.filter((t) => t.id !== vars.id);
            return data;
          },
        );

        cache.invalidate({
          __typename: "Timebox",
          id: vars.id,
        });
      }
    },

    // Task
    createTask(result: CreateTaskMutation, _vars: CreateTaskMutationVariables, cache) {
      cache.updateQuery({ query: TasksScreenQuery }, (data) => {
        if (!data) return data;
        data.tasks.push(result.createTask);
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
