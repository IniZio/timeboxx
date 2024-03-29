import { CheckCircle, Clock, TaskList } from "iconoir-react";
import { useTranslation } from "react-i18next";

import { LogoWithTitle } from "@/components/LogoWithTitle";
import { Routes } from "@/Router";
import { NavItem } from "@/shells/NavItem";

const SideNav: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-shrink-0" un-w="260px" un-bg="#FDFDFD" un-border="r slate-200">
      <div className="px-8 py-6">
        <LogoWithTitle />
      </div>
      <div un-p="x-8 y-4" className="flex flex-col gap-y-1">
        <NavItem
          icon={<Clock width={16} height={16} strokeWidth={2} un-text="gray-900" />}
          label={t("shells.app.nav.today")}
          to={Routes.App.Today}
        />
        <NavItem
          icon={<TaskList width={16} height={16} strokeWidth={2} un-text="gray-900" />}
          label={t("shells.app.nav.timeboxes")}
          to={Routes.App.Planned}
        />
        <NavItem
          icon={<CheckCircle width={16} height={16} strokeWidth={2} un-text="gray-900" />}
          label={t("shells.app.nav.tasks")}
          to={Routes.App.Tasks}
        />
      </div>
    </div>
  );
};

export default SideNav;
