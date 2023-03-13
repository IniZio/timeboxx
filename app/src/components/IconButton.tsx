import { Plus } from "iconoir-react";

export interface IconButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = () => {
  return (
    <button className="inline-flex items-center justify-center bg-white border rounded-md border-gray-200 p-0.5">
      <Plus height={16} width={16} />
    </button>
  );
};
