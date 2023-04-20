import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { TaskList } from "@/modules/tasks/components/TaskList";
import { TaskStatus } from "@/modules/tasks/constants";

export interface TasksScreenProps {
  className?: string;
  children?: React.ReactNode;
}

const ORDERED_TASK_STATUS_LIST = [
  null,
  TaskStatus.Backlog,
  TaskStatus.Todo,
  TaskStatus.InProgress,
  TaskStatus.Done,
  TaskStatus.Cancelled,
];

const COLLAPSED_TASK_STATUS_LIST = [null, TaskStatus.Backlog, TaskStatus.Done, TaskStatus.Cancelled];

export const TasksScreenQuery = graphql(`
  query TasksScreen {
    tasks {
      ...TaskList_TaskFragment
    }
  }
`);

export const UpdateTaskMutation = graphql(`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      ...TaskList_TaskFragment
    }
  }
`);

export const TasksScreen: React.FC<TasksScreenProps> = () => {
  const { t } = useTranslation();

  const [tasksScreen, refetchTasks] = useQuery({
    query: TasksScreenQuery,
    requestPolicy: "cache-and-network",
  });

  const [_, updateTaskMutation] = useMutation(UpdateTaskMutation);

  const handleTasksDrop = useCallback(
    (taskIds: string[], status: Maybe<TaskStatus>) => {
      // FIXME: Only handle single drag for now
      const task = tasksScreen.data?.tasks.find((task) => task.id === taskIds[0]);
      if (!task) {
        return;
      }

      updateTaskMutation({
        input: { id: task.id.toString(), status, dirtyFields: ["status"] },
      });
    },
    [tasksScreen.data?.tasks, updateTaskMutation],
  );

  return (
    <div className="flex w-full h-full">
      <div un-p="t-6" un-h="full" className="flex flex-col min-w-0">
        <h1 un-m="b-4" un-text="3xl" un-font="semibold" className="px-6 text-gray-700">
          {t("modules.tasks.title")}
        </h1>

        <div className="flex px-6 flex-1 mt-2 gap-2 overflow-x-auto">
          {ORDERED_TASK_STATUS_LIST.map((status) => {
            const tasks = tasksScreen.data?.tasks.filter((task) => task.status === status);
            const collapsed = COLLAPSED_TASK_STATUS_LIST.includes(status);

            return (
              <TaskList
                key={status}
                status={status}
                collapsed={collapsed}
                tasks={tasks}
                onDrop={handleTasksDrop}
                onRefresh={refetchTasks}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
