import { useNavigate } from "react-router-dom";
import { useMount } from "react-use";

import { LogoWithTitle } from "@/components/LogoWithTitle";
import { authStore } from "@/modules/auth/store";
import { Routes } from "@/Router";

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  useMount(() => {
    authStore.fetchUserInfo().then((userInfo) => {
      if (!userInfo) {
        return authStore.login();
      }

      navigate({ pathname: Routes.App.Today });
    });
  });

  return (
    <div un-h="screen" un-flex="~" un-justify="center" un-items="center" un-duration="1000" un-animate="pulse">
      <LogoWithTitle />
    </div>
  );
};
