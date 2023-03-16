import { useDroppable } from "@dnd-kit/core";

import { cn } from "@/utils";

export interface DroppableProps {
  id: string;
  children?: React.ReactNode;
}

export function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} className={cn(isOver && "bg-slate-100/30")}>
      {props.children}
    </div>
  );
}
