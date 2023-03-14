import { useTranslation } from "react-i18next";
import { useQuery } from "urql";

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

const TasksScreenQuery = graphql(`
  query TasksScreen {
    tasks {
      id
      description
      endTime
      startTime
      title
      status
    }
  }
`);

export const TasksScreen: React.FC<TasksScreenProps> = () => {
  const { t } = useTranslation();

  const [tasksScreen, refetchTasaksScreen] = useQuery({
    query: TasksScreenQuery,
    requestPolicy: "cache-and-network",
  });

  return (
    <div className="flex w-full h-full">
      <div un-p="t-6" un-h="full" className="flex flex-col min-w-0">
        <h1 un-m="b-4" un-text="3xl" un-font="semibold" className="px-6">
          {t("modules.tasks.title")}
        </h1>

        <div className="flex px-6 flex-1 mt-2 gap-8 overflow-x-auto">
          {ORDERED_TASK_STATUS_LIST.map((status) => {
            const tasks = tasksScreen.data?.tasks.filter((task) => task.status === status);

            return <TaskList key={status} status={status} tasks={tasks} onRefresh={refetchTasaksScreen} />;
          })}
        </div>
      </div>
    </div>
  );
};
