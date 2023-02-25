import type { UserInfo } from "@authgear/web";
import { atom } from "@iniz/react";
import { redirect } from "react-router-dom";

import { authStore } from "@/modules/auth/store";
import { Routes } from "@/Router";
import { loader, LoaderScreen } from "@/shells/loader";

const counter = atom(1);
const increment = () => counter(counter() + 1);

export const AppShell: LoaderScreen<UserInfo> = () => {
  return (
    <div>
      <button onClick={increment}>{counter()}++</button>
    </div>
  );
};

AppShell.loader = loader(async () => {
  const user = await authStore.fetchUserInfo();
  if (user == null) {
    return redirect(Routes.Home);
  }
  return user;
});
