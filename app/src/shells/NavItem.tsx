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
      className="items-center w-full inline-flex space-x-2 justify-start rounded-md py-2.5 px-2.5 bg-gray-100 transition-colors"
      un-hover="bg-gray-200"
    >
      {icon}
      <p className="text-sm text-gray-900 flex-1 font-medium leading-tight">{label}</p>
    </NavLink>
  );
};
