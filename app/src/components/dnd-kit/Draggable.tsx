import { useDraggable } from "@dnd-kit/core";
import { useMemo } from "react";

export interface DraggableProps {
  id: string;
  children?: React.ReactNode;
}

export function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
  });
  const style = useMemo(
    () => ({
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      opacity: isDragging ? 0 : undefined,
    }),
    [isDragging, transform],
  );

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}
