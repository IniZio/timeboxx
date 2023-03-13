import { useTranslation } from "react-i18next";
import { useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { Card } from "@/components/Card";
import { IconButton } from "@/components/IconButton";
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

  const [tasksScreen] = useQuery({
    query: TasksScreenQuery,
    requestPolicy: "cache-and-network",
  });

  return (
    <div className="flex h-full w-full">
      <div un-p="t-6" un-h="full" className="flex flex-col min-w-0">
        <h1 un-m="b-4" un-text="3xl" un-font="semibold" className="px-6">
          {t("modules.tasks.title")}
        </h1>

        <div className="flex px-6 gap-8 overflow-x-auto flex-1 mt-2">
          {ORDERED_TASK_STATUS_LIST.map((status) => (
            <div key={status}>
              <div className="flex flex-shrink-0 w-70 mb-4">
                <p className="flex-1 text-sm leading-7 text-gray-500 capitalize">
                  {(status ?? "No Status").toLocaleLowerCase()}
                </p>
                <IconButton />
              </div>

              {tasksScreen.data?.tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <Card key={task.id}>
                    <p className="text-sm text-gray-900 leading-none">{task.title}</p>
                  </Card>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
