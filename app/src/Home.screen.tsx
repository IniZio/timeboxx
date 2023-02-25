import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMount } from "react-use";

import LogoWithTitle from "@/assets/logo_with_title.svg";
import { useAuth } from "@/modules/auth/store";
import { Routes } from "@/Router";

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();

  useMount(() => {
    auth.fetchUserInfo().then((userInfo) => {
      if (!userInfo) {
        return auth.login();
      }

      navigate({ pathname: Routes.App.Today });
    });
  });

  return (
    <div un-h="screen" un-flex="~" un-justify="center" un-items="center" un-duration="1000" un-animate="pulse">
      <img src={LogoWithTitle} alt={t("app.name")} />
    </div>
  );
};

export default HomeScreen;
