import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "virtual:unocss-devtools";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./i18n";
import "./index.css";
import "./plugins/dayjs";

import { defaultTheme, Provider as SpectrumProvider } from "@adobe/react-spectrum";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as UrqlProvider } from "urql";

import { grahpqlClient } from "./apis/graphql/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SpectrumProvider theme={defaultTheme}>
      <UrqlProvider value={grahpqlClient}>
        <App />
      </UrqlProvider>
    </SpectrumProvider>
  </React.StrictMode>,
);
