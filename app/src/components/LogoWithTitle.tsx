import React from "react";
import { useTranslation } from "react-i18next";

import srcLogoWithTitle from "@/assets/logo-with-title.svg";

export const LogoWithTitle: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();

  return <img className={className} src={srcLogoWithTitle} alt={t("app.name")} />;
};
