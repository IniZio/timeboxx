import { ClockIcon } from "@radix-ui/react-icons";
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
          icon={<ClockIcon un-text="gray-900" className="w-4 h-4" un-stroke="2" />}
          label={t("shells.app.nav.today")}
          to={Routes.App.Today}
        />
      </div>
    </div>
  );
};

export default SideNav;
