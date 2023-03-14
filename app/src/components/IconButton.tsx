import { Plus } from "iconoir-react";
import { MouseEventHandler } from "react";

import { cn } from "@/utils";

export interface IconButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const IconButton: React.FC<IconButtonProps> = ({ className, onClick }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center bg-white border rounded-md border-gray-200 p-0.5",
        className,
      )}
      onClick={onClick}
    >
      <Plus height={16} width={16} />
    </button>
  );
};
