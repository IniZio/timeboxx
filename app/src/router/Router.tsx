import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { OAuthRedirectScreen } from "@/modules/auth/screens/OAuthRedirect.screen";

import { Routes } from "./routes";

const router = createBrowserRouter([
  {
    path: Routes.OAuthRedirect,
    element: <OAuthRedirectScreen />,
  },
  {
    path: Routes.Home,
    element: null,
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
