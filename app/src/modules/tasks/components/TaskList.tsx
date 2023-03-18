import { Plus } from "iconoir-react";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { Card } from "@/components/Card";
import { Draggable } from "@/components/dnd-kit/Draggable";
import { IconButton } from "@/components/IconButton";
import { TaskCard } from "@/modules/tasks/components/TaskCard";
import { TaskStatus } from "@/modules/tasks/constants";
import { TaskListTask } from "@/modules/tasks/view-models";

export interface TaskListProps {
  className?: string;
  status: Maybe<TaskStatus>;
  tasks?: TaskListTask[];
  onRefresh?: () => void;
}

const CreateTaskMutation = graphql(`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      ...TaskList_TaskFragment
    }
  }
`);

export const TaskList_TaskFragment = graphql(`
  fragment TaskList_TaskFragment on Task {
    id
    title
    status
  }
`);

export const TaskList: React.FC<TaskListProps> = ({ tasks, status, onRefresh }) => {
  const { t } = useTranslation();

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
    <div className="flex flex-col max-h-full w-70 h-full p-2">
      <div className="flex max-w-full">
        <p className="text-sm flex-1 leading-7 text-gray-500 capitalize">
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
              className="text-sm leading-normal text-gray-900 mb-2 p-1 w-full"
              value={title}
              onChange={handleChangeTitle}
            />
            <button
              className="leading-normal bg-slate-900 text-white rounded-md py-1 px-2 font-medium text-xs"
              type="submit"
            >
              {t("modules.tasks.components.TaskList.add")}
            </button>
          </form>
        </Card>
      )}

      <div className="flex flex-col max-h-full h-full gap-y-2 overflow-y-auto pb-6 mt-4 overflow-x-hidden">
        {tasks?.map((task) => {
          return (
            <Draggable key={task.id} id={task.id}>
              <TaskCard task={task} onRefresh={onRefresh} />
            </Draggable>
          );
        })}
      </div>
    </div>
  );
};
