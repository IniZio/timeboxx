import { Clock } from "iconoir-react";
import { useTranslation } from "react-i18next";

import { LogoWithTitle } from "@/components/LogoWithTitle";
import { Routes } from "@/Router";
import { NavItem } from "@/shells/NavItem";

const SideNav: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div un-w="260px" un-bg="#FDFDFD" un-border="r slate-200">
      <div className="px-8 py-6">
        <LogoWithTitle />
      </div>
      <div un-p="x-8 y-4">
        <NavItem
          icon={<Clock width={16} height={16} strokeWidth={2} un-text="gray-900" />}
          label={t("shells.app.nav.today")}
          to={Routes.App.Today}
        />
      </div>
    </div>
  );
};

export default SideNav;
