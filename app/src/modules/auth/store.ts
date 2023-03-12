import type { UserInfo } from "@authgear/web";
import { PromptOption } from "@authgear/web";
import { store } from "@iniz/react";

import { authClient } from "@/apis/auth/client";
import { Routes } from "@/Router";

interface AuthState {
  userInfo?: UserInfo;
  fetchUserInfo: () => Promise<UserInfo | undefined>;
  login: () => Promise<void>;
}

export const authStore = store<AuthState>({
  userInfo: undefined,
  async fetchUserInfo() {
    authStore.userInfo = await authClient.fetchUserInfo().catch(() => undefined);
    return this.userInfo;
  },
  async login() {
    await authClient.startAuthentication({
      redirectURI: new URL(Routes.OAuthRedirect, location.href).href,
      prompt: PromptOption.Login,
    });
  },
});
