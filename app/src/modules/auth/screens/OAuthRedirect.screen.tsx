import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authClient } from "@/apis/auth/client";
import { Routes } from "@/Router";

export const OAuthRedirectScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authClient
      .finishAuthentication()
      .then(() => {
        navigate({ pathname: Routes.App.Today }, { replace: true });
      })
      .catch((e) => console.error(e));
  });

  return <div className="flex items-center justify-center h-screen">Redirecting...</div>;
};
