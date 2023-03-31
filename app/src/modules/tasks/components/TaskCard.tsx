import { Bin, EditPencil, EyeAlt } from "iconoir-react";
import { FormEvent, useCallback, useState } from "react";
import { DragItem, useDrag } from "react-aria";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { Card } from "@/components/Card";
import { FormRichTextEditor } from "@/components/form/FormRichTextEditor";
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

type TaskForm = {
  title: Maybe<string>;
  description: Maybe<string>;
};

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

  const taskForm = useForm<TaskForm>({
    values: {
      title: task.title,
      description: JSON.parse(task.description || "[]"),
    },
  });

  const handleSubmit = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      setIsEditting(false);
      const taskFormValues = taskForm.getValues();
      updateTaskMutation({
        input: {
          id: task.id,
          title: taskFormValues.title,
          description: JSON.stringify(taskFormValues.description),
          dirtyFields: Object.keys(taskForm.formState.dirtyFields),
        },
      }).then(() => {
        onRefresh?.();
      });
    },
    [onRefresh, task.id, taskForm, updateTaskMutation],
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
            <input className="text-sm flex-1 text-gray-900 leading-normal min-w-0" {...taskForm.register("title")} />
            <div className="flex gap-x-1">
              <IconButton>
                <Bin width={16} height={16} className="text-red cursor-pointer" onClick={handleDeleteTask} />
              </IconButton>
              <IconButton onClick={() => setIsEditting(false)}>
                <EyeAlt width={16} height={16} />
              </IconButton>
            </div>
          </div>
          <FormRichTextEditor key={task.id} control={taskForm.control} name="description" />
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
