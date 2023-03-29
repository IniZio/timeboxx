import type { UserInfo } from "@authgear/web";
import { Outlet, redirect } from "react-router-dom";

import { authStore } from "@/modules/auth/store";
import { Routes } from "@/Router";
import { loader, LoaderScreen } from "@/shells/loader";
import SideNav from "@/shells/SideNav";

export const AppShell: LoaderScreen<UserInfo> = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideNav />
        <div className="flex-1 min-w-0 bg-white isolate">
          <Outlet />
        </div>
      </div>
    </>
  );
};

AppShell.loader = loader(async () => {
  const user = await authStore.fetchUserInfo();
  if (user == null) {
    return redirect(Routes.Home);
  }
  return user;
});
