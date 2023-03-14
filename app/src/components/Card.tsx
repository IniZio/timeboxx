import { cn } from "@/utils";

export interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={cn("rounded-md p-3 bg-white shadow border border-gray-200", className)}>{children}</div>;
};
