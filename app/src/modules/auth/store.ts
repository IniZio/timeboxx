import type { UserInfo } from "@authgear/web";
import { PromptOption } from "@authgear/web";
import { create } from "zustand";

import { authClient } from "@/apis/auth/client";
import { Routes } from "@/Router";

interface AuthState {
  userInfo?: UserInfo;
  fetchUserInfo: () => Promise<UserInfo>;
  login: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  userInfo: undefined,
  async fetchUserInfo() {
    const userInfo = await authClient.fetchUserInfo();
    set({ userInfo });
    return userInfo;
  },
  async login() {
    await authClient.startAuthentication({
      redirectURI: `http://localhost:5173${Routes.OAuthRedirect}`,
      prompt: PromptOption.Login,
    });
  },
}));
