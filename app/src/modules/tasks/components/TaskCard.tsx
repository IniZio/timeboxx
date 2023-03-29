import { Bin, EditPencil, EyeAlt } from "iconoir-react";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { DragItem, useDrag } from "react-aria";
import { useTranslation } from "react-i18next";
import { useMutation } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { Card } from "@/components/Card";
import { IconButton } from "@/components/IconButton";
import { UpdateTaskMutation } from "@/modules/tasks/screens/Tasks.screen";
import { TaskListTask } from "@/modules/tasks/view-models";

export interface TaskCardProps {
  className?: string;
  task: TaskListTask;
  onRefresh?: () => void;
}

const DeleteTaskMutation = graphql(`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id)
  }
`);

export const TaskCard: React.FC<TaskCardProps> = ({ task, onRefresh }) => {
  const { t } = useTranslation();

  const [_, updateTaskMutation] = useMutation(UpdateTaskMutation);
  const [__, deleteTaskMutation] = useMutation(DeleteTaskMutation);

  const { dragProps, isDragging } = useDrag({
    getItems() {
      return [task as unknown as DragItem];
    },
  });

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

  const handleDeleteTask = useCallback(() => {
    deleteTaskMutation({ id: task.id }).then(() => {
      onRefresh?.();
    });
  }, [deleteTaskMutation, onRefresh, task.id]);

  if (isEditting) {
    return (
      <Card {...dragProps} className={isDragging ? "hidden" : ""}>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-x-1">
            <input
              className="text-sm flex-1 text-gray-900 leading-normal min-w-0"
              value={title}
              onChange={handleChangeTitle}
            />
            <div className="flex gap-x-1">
              <IconButton>
                <Bin width={16} height={16} className="text-red cursor-pointer" onClick={handleDeleteTask} />
              </IconButton>
              <IconButton onClick={() => setIsEditting(false)}>
                <EyeAlt width={16} height={16} />
              </IconButton>
            </div>
          </div>
          <button
            className="leading-normal text-xs py-1 mt-2 bg-slate-900 text-white rounded-md px-2 font-medium"
            type="submit"
          >
            {t("modules.tasks.components.TaskList.save")}
          </button>
        </form>
      </Card>
    );
  }

  return (
    <Card {...dragProps} className={isDragging ? "hidden" : ""}>
      <div className="flex gap-x-1">
        <p className="text-sm text-gray-900 min-w-0 flex-1 overflow-hidden text-ellipsis break-words leading-relaxed">
          {task.title}
        </p>
        <IconButton onClick={() => setIsEditting(true)}>
          <EditPencil width={16} height={16} />
        </IconButton>
      </div>
    </Card>
  );
};
