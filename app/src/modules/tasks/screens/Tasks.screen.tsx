import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { DndContext, DragOverlay, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { Droppable } from "@/components/dnd-kit/Droppable";
import { TaskCard } from "@/modules/tasks/components/TaskCard";
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

const UpdateTaskMutation = graphql(`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      title
      status
    }
  }
`);

export const TasksScreen: React.FC<TasksScreenProps> = () => {
  const { t } = useTranslation();

  const [tasksScreen, refetchTasksScreen] = useQuery({
    query: TasksScreenQuery,
    requestPolicy: "cache-and-network",
  });

  const [_, updateTaskMutation] = useMutation(UpdateTaskMutation);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor);

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const draggedTask = useMemo(
    () => tasksScreen.data?.tasks.find((t) => t.id === draggedTaskId),
    [draggedTaskId, tasksScreen.data?.tasks],
  );
  const handleDragStart = useCallback((evt: DragStartEvent) => {
    setDraggedTaskId(evt.active.id.toString());
  }, []);
  const handleDragEnd = useCallback(
    (evt: DragEndEvent) => {
      setDraggedTaskId(null);
      const { active, over } = evt;
      updateTaskMutation({
        input: { id: active.id.toString(), status: over?.id as TaskStatus, dirtyFields: ["status"] },
      }).then(() => refetchTasksScreen());
    },
    [refetchTasksScreen, updateTaskMutation],
  );

  return (
    <div className="flex w-full h-full">
      <div un-p="t-6" un-h="full" className="flex flex-col min-w-0">
        <h1 un-m="b-4" un-text="3xl" un-font="semibold" className="px-6">
          {t("modules.tasks.title")}
        </h1>

        <div className="flex px-6 flex-1 mt-2 gap-8 overflow-x-auto">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
            {ORDERED_TASK_STATUS_LIST.map((status) => {
              const tasks = tasksScreen.data?.tasks.filter((task) => task.status === status);

              return (
                <Droppable key={status} id={status as string}>
                  <TaskList status={status} tasks={tasks} onRefresh={refetchTasksScreen} />
                </Droppable>
              );
            })}
            <DragOverlay>{draggedTask ? <TaskCard task={draggedTask} /> : null}</DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
};
