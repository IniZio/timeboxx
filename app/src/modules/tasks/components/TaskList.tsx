import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Task } from "@/apis/graphql/generated/graphql";
import { Card } from "@/components/Card";
import { IconButton } from "@/components/IconButton";
import { TaskStatus } from "@/modules/tasks/constants";

export interface TaskListProps {
  className?: string;
  status: Maybe<TaskStatus>;
  tasks?: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, status }) => {
  const { t } = useTranslation();

  const [taskInputVisibility, setTaskInputVisibility] = useState(false);

  return (
    <div className="flex flex-col max-h-full">
      <div className="flex flex-shrink-0 w-70">
        <p className="flex-1 text-sm leading-7 text-gray-500 capitalize">
          {t(`modules.tasks.constants.status.${status?.toLowerCase() ?? "no_status"}` as never)}
        </p>
        <IconButton onClick={() => setTaskInputVisibility((v) => !v)} />
      </div>

      {taskInputVisibility && (
        <Card className="flex mt-2 p-2 gap-2">
          <form>
            <input placeholder="Title" className="text-sm mb-2 leading-normal text-gray-900 w-full" />
            <button
              className="leading-normal bg-slate-900 text-white rounded-md py-1 px-2 font-medium text-xs"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Card>
      )}

      <div className="flex flex-col max-h-full gap-y-2 overflow-y-auto pb-6 mt-4">
        {tasks?.map((task) => (
          <Card key={task.id}>
            <p className="text-sm text-gray-900 leading-none">{task.title}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
