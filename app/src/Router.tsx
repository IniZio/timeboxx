import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { FullScreenLoading } from "@/components/FullScreenLoading";
import { HomeScreen } from "@/Home.screen";
import { OAuthRedirectScreen } from "@/modules/auth/screens/OAuthRedirect.screen";
import { TodayScreen } from "@/modules/today/screens/Today.screen";
import { AppShell } from "@/shells";

export const Routes = {
  Home: "/",
  OAuthRedirect: "/oauth-redirect",
  App: {
    Today: "/app/today",
  },
};

const router = createBrowserRouter([
  {
    path: Routes.OAuthRedirect,
    element: <OAuthRedirectScreen />,
  },
  {
    path: Routes.Home,
    element: <HomeScreen />,
  },
  {
    element: <AppShell />,
    loader: AppShell.loader,
    children: [
      {
        path: Routes.App.Today,
        element: <TodayScreen />,
      },
    ],
  },
]);

export const Router: React.FC = () => {
  const { t } = useTranslation();

  const defaultTitle = t("app.name");
  const titleTemplate = `%s | ${t("app.name")}`;

  return (
    <HelmetProvider>
      <Helmet titleTemplate={titleTemplate} defaultTitle={defaultTitle} />
      <RouterProvider router={router} fallbackElement={<FullScreenLoading />} />
    </HelmetProvider>
  );
};
