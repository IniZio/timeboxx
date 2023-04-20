import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import dayjs from "dayjs";
import { Bin, EditPencil, EyeAlt } from "iconoir-react";
import { FormEvent, useCallback, useMemo, useState } from "react";
import { DragItem, useDrag } from "react-aria";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { TimeslotStatus } from "@/apis/graphql/generated/graphql";
import { Card } from "@/components/Card";
import { DateField } from "@/components/DateField";
import { FormDateTimePicker } from "@/components/form/FormDateTimePickerr";
import { FormRichTextEditor } from "@/components/form/FormRichTextEditor";
import { IconButton } from "@/components/IconButton";
import { DurationField, Timer, TimerStatus, useTimer } from "@/components/Timer";
import { UpdateTaskMutation } from "@/modules/tasks/screens/Tasks.screen";
import { TaskListTask } from "@/modules/tasks/view-models";
import { cn } from "@/utils";

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

const CreateTimeslotMutation = graphql(`
  mutation CreateTimeslot($input: CreateTimeslotInput!) {
    createTimeslot(input: $input) {
      id
      taskId
      title
      status
      startTime
      endTime
      duration
    }
  }
`);

const UpdateTimeslotMutation = graphql(`
  mutation UpdateTimeslot($input: UpdateTimeslotInput!) {
    updateTimeslot(input: $input) {
      id
      taskId
      title
      status
      startTime
      endTime
      duration
    }
  }
`);

type TaskForm = {
  title: Maybe<string>;
  description: Maybe<string>;
  deadline: Maybe<DateValue>;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onRefresh }) => {
  const { t } = useTranslation();

  const [_, updateTaskMutation] = useMutation(UpdateTaskMutation);
  const [__, deleteTaskMutation] = useMutation(DeleteTaskMutation);

  const [___, createTimeslotMutation] = useMutation(CreateTimeslotMutation);
  const [____, updateTimeslotMutation] = useMutation(UpdateTimeslotMutation);

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
      deadline: task.deadline ? parseAbsoluteToLocal(dayjs(task.deadline)?.toISOString()) : null,
    },
  });
  const deadline = useWatch({ control: taskForm.control, name: "deadline" });
  const isDeadlineFighter = useMemo(
    () => deadline && dayjs.fromDateValue(deadline).isAfter(dayjs().startOf("day")),
    [deadline],
  );

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
          deadline: taskFormValues.deadline?.toString(),
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

  const lastTimeslot = task.timeslots?.at(-1);
  const {
    timerProps,
    duration,
    status: timerStatus,
  } = useTimer({
    status: lastTimeslot?.status as Maybe<TimerStatus>,
    startTime:
      lastTimeslot?.status !== TimeslotStatus.Stopped ? dayjs(task.timeslots?.at(-1)?.startTime).toDate() : null,
    duration: lastTimeslot?.status !== TimeslotStatus.Stopped ? lastTimeslot?.duration : null,
    onStart() {
      createTimeslotMutation({
        input: {
          taskId: task.id,
          title: task.title,
        },
      }).then(() => {
        onRefresh?.();
      });
    },
    onResume() {
      if (!lastTimeslot) return;

      updateTimeslotMutation({
        input: {
          id: lastTimeslot.id,
          taskId: task.id,
          duration,
          startTime: dayjs().toISOString(),
          status: TimeslotStatus.Started,
          dirtyFields: ["duration", "start_time", "status"],
        },
      }).then(() => {
        onRefresh?.();
      });
    },
    onPause(duration) {
      if (!lastTimeslot) return;

      updateTimeslotMutation({
        input: {
          id: lastTimeslot.id,
          taskId: task.id,
          duration,
          status: TimeslotStatus.Paused,
          dirtyFields: ["duration", "status"],
        },
      }).then(() => {
        onRefresh?.();
      });
    },
    onStop(duration) {
      if (!lastTimeslot) return;

      updateTimeslotMutation({
        input: {
          id: lastTimeslot.id,
          taskId: task.id,
          duration,
          endTime: dayjs().toISOString(),
          status: TimeslotStatus.Stopped,
          dirtyFields: ["duration", "end_time", "status"],
        },
      }).then(() => {
        onRefresh?.();
      });
    },
  });

  const totalDuration = useMemo(
    () => task.timeslots?.reduce((acc, timeslot) => acc + (timeslot.duration ?? 0), 0) || 0,
    [task.timeslots],
  );

  if (isEditting) {
    return (
      <Card {...dragProps} className={isDragging ? "hidden" : ""}>
        <form onSubmit={handleSubmit}>
          <div>
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
            <FormDateTimePicker
              control={taskForm.control}
              name="deadline"
              granularity="minute"
              className={cn(isDeadlineFighter && "text-red")}
              aria-label="deadline"
            />
            {task.timeslots?.map((timeslot) => (
              <div key={timeslot.id}>
                <p className="text-xs">
                  {dayjs(timeslot.startTime).format("MMM D h:mm A")}{" -> "}
                  {timeslot.endTime && dayjs(timeslot.endTime).format("MMM D, YYYY h:mm A")}
                </p>
              </div>
            ))}
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
        {task.deadline && <DateField value={parseAbsoluteToLocal(task.deadline)} aria-label="deadline" />}
        <IconButton onClick={() => setIsEditting(true)}>
          <EditPencil width={16} height={16} />
        </IconButton>
      </div>
      <div className="flex">
        <Timer {...timerProps} />
        {timerStatus === TimerStatus.Stopped && <DurationField duration={totalDuration} />}
      </div>
    </Card>
  );
};
