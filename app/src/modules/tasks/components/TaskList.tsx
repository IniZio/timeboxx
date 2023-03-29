import { Plus } from "iconoir-react";
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { TextDropItem, useDrop } from "react-aria";
import { useTranslation } from "react-i18next";
import { useMutation } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { Card } from "@/components/Card";
import { IconButton } from "@/components/IconButton";
import { TaskCard } from "@/modules/tasks/components/TaskCard";
import { TaskStatus } from "@/modules/tasks/constants";
import { TaskListTask } from "@/modules/tasks/view-models";
import { cn } from "@/utils";

export interface TaskListProps {
  className?: string;
  status: Maybe<TaskStatus>;
  tasks?: TaskListTask[];
  onRefresh?: () => void;
  onDrop?: (taskIds: string[], status: Maybe<TaskStatus>) => void;
}

const CreateTaskMutation = graphql(`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      ...TaskList_TaskFragment
    }
  }
`);

export const TaskList_TaskFragment = graphql(`
  fragment TaskList_TaskFragment on TaskType {
    id
    title
    status
  }
`);

export const TaskList: React.FC<TaskListProps> = ({ tasks, status, onRefresh, onDrop }) => {
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>(null);
  const { dropProps, isDropTarget } = useDrop({
    ref,
    async onDrop(e) {
      const taskIds = await Promise.all(
        e.items.filter((item) => item.kind === "text").map((item) => (item as unknown as TextDropItem).getText("id")),
      );

      onDrop?.(taskIds, status);
    },
  });

  const [_, createTaskMutation] = useMutation(CreateTaskMutation);

  const [taskInputVisibility, setTaskInputVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const handleChangeTitle = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  }, []);

  const handleSubmitCreateTask = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      createTaskMutation({
        input: {
          title,
          status,
        },
      }).then(() => {
        setTitle("");
        setTaskInputVisibility(false);
        onRefresh?.();
      });
    },
    [createTaskMutation, onRefresh, status, title],
  );

  return (
    <div
      className={cn(
        "flex flex-col flex-shrink-0 max-h-full w-70 h-full p-2 rounded transition-colors",
        isDropTarget && "bg-slate-100",
      )}
      {...dropProps}
    >
      <div className="flex max-w-full">
        <p className="text-gray-500 text-sm leading-7 flex-1 capitalize">
          {t(`modules.tasks.constants.status.${status?.toLowerCase() ?? "no_status"}` as never)}
        </p>
        <IconButton onClick={() => setTaskInputVisibility((v) => !v)}>
          <Plus />
        </IconButton>
      </div>

      {taskInputVisibility && (
        <Card className="flex mt-2 p-2 gap-2">
          <form onSubmit={handleSubmitCreateTask}>
            <input
              placeholder="Title"
              className="text-sm w-full leading-normal text-gray-900 mb-2 p-1"
              value={title}
              onChange={handleChangeTitle}
            />
            <button
              className="leading-normal text-xs bg-slate-900 text-white rounded-md py-1 px-2 font-medium"
              type="submit"
            >
              {t("modules.tasks.components.TaskList.add")}
            </button>
          </form>
        </Card>
      )}

      <div className="flex flex-col max-h-full h-full gap-y-2 overflow-y-auto pb-6 mt-4 overflow-x-hidden">
        {tasks?.map((task) => {
          return <TaskCard key={task.id} task={task} onRefresh={onRefresh} />;
        })}
      </div>
    </div>
  );
};
