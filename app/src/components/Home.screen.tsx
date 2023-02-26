import { useNavigate } from "react-router-dom";
import { useMount } from "react-use";

import { FullScreenLoading } from "@/components/FullScreenLoading";
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

  return <FullScreenLoading />;
};
