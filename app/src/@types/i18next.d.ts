import "i18next";
import "react-i18next";

import { resources } from "../i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: (typeof resources)["en"];
  }
}

declare module "react-i18next" {
  type DefaultResources = (typeof resources)["en"];
  type Resources = DefaultResources;
}
