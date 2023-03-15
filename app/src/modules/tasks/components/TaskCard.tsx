import { EditPencil, EyeAlt } from "iconoir-react";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { Card } from "@/components/Card";
import { IconButton } from "@/components/IconButton";
import { TaskListTask } from "@/modules/tasks/view-models";

export interface TaskCardProps {
  className?: string;
  task: TaskListTask;
  onRefresh?: () => void;
}

const UpdateTaskMutation = graphql(`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
    }
  }
`);

export const TaskCard: React.FC<TaskCardProps> = ({ task, onRefresh }) => {
  const { t } = useTranslation();

  const [__, updateTaskMutation] = useMutation(UpdateTaskMutation);

  const [isEditting, setIsEditting] = useState(false);
  const [title, setTitle] = useState(task.title ?? "");
  const handleChangeTitle = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  }, []);

  const handleSubmit = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      setIsEditting(false);
      updateTaskMutation({
        input: {
          id: task.id,
          title,
          dirtyFields: ["title"],
        },
      }).then(() => {
        onRefresh?.();
      });
    },
    [onRefresh, task.id, title, updateTaskMutation],
  );

  if (isEditting) {
    return (
      <Card className="relative">
        <IconButton className="top-2 right-2 absolute" onClick={() => setIsEditting(false)}>
          <EyeAlt width={16} height={16} />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <input className="text-sm text-gray-900 leading-normal" value={title} onChange={handleChangeTitle} />
          <button
            className="leading-normal mt-2 bg-slate-900 text-white rounded-md py-1 px-2 font-medium text-xs"
            type="submit"
          >
            {t("modules.tasks.components.TaskList.save")}
          </button>
        </form>
      </Card>
    );
  }

  return (
    <Card className="relative">
      <IconButton className="top-2 right-2 absolute" onClick={() => setIsEditting(true)}>
        <EditPencil width={16} height={16} />
      </IconButton>
      <p className="text-sm text-gray-900 leading-normal">{task.title}</p>
    </Card>
  );
};
