import type { UserInfo } from '@authgear/web'
import { create } from 'zustand'

import { authClient } from '@/apis/auth/client';

interface AuthState {
  userInfo?: UserInfo;
  fetchUserInfo: () => Promise<void>;
}


export const useAuth = create<AuthState>((set) => ({
  userInfo: undefined,
  async fetchUserInfo() {
    const userInfo = await authClient.fetchUserInfo();
    set({ userInfo });
  }
}))