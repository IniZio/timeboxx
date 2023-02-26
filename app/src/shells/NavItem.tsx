import type { To } from "react-router-dom";
import { NavLink } from "react-router-dom";

export interface NavItemProps {
  icon: React.ReactNode;
  label: React.ReactNode;
  to: To;
}

export const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className="inline-flex space-x-2 items-center justify-start rounded-md w-full py-2.5 px-2.5 bg-gray-100 transition-colors"
      un-hover="bg-gray-200"
    >
      {icon}
      <p className="flex-1 text-sm text-gray-900 font-medium leading-tight">{label}</p>
    </NavLink>
  );
};
