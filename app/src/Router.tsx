import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeScreen from "@/Home.screen";
import { AppShell } from "@/shells";
import { OAuthRedirectScreen } from "@/modules/auth/screens/OAuthRedirect.screen";

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
    children: [
      {
        path: Routes.App.Today,
        element: null,
      },
    ],
  },
]);

export const Router: React.FC = () => {
  const defaultTitle = "Timeboxx";
  const titleTemplate = "Timeboxx - %s";

  return (
    <HelmetProvider>
      <Helmet titleTemplate={titleTemplate} defaultTitle={defaultTitle} />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};
