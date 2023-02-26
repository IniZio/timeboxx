import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "virtual:unocss-devtools";
import "./i18n";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as UrqlProvider } from "urql";

import { grahpqlClient } from "./apis/graphql/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UrqlProvider value={grahpqlClient}>
      <App />
    </UrqlProvider>
  </React.StrictMode>,
);
