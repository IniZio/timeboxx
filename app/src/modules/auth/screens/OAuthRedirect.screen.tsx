import React, { useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { authClient } from "@/apis/auth/client";
import { Routes } from "@/router/routes";

export const OAuthRedirectScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authClient
      .finishAuthentication()
      .then((user) => {
        console.log("user", user);
      })
      .catch((e) => console.error(e));
  });

  useEffect(() => {
    authClient.fetchUserInfo().then((user) => {
      if (!user) {
        return;
      }

      navigate({ pathname: generatePath(Routes.Home) }, { replace: true });
    });
  }, [navigate]);

  return <div className="flex items-center justify-center h-full">Redirecting...</div>;
};
