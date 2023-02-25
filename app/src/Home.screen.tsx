import { useNavigate } from "react-router-dom";
import { useMount } from "react-use";

import LogoWithTitle from "@/assets/logo_with_title.svg";
import { useAuth } from "@/modules/auth/store";
import { Routes } from "@/Router";

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

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
      <img src={LogoWithTitle} alt="Timeboxx" />
    </div>
  );
};

export default HomeScreen;
