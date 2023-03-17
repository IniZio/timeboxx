import { MouseEventHandler } from "react";

import { cn } from "@/utils";

export interface IconButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const IconButton: React.FC<IconButtonProps> = ({ className, children, onClick }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center bg-white border rounded-md border-gray-200 hover:shadow p-0.5 w-6 h-6",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
