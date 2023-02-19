import authgear from "@authgear/web";

class AuthClient {
  #ensureInitialized: Promise<void>;

  constructor() {
    this.#ensureInitialized = authgear.configure({
      endpoint: import.meta.env.VITE_APP_AUTHGEAR_ENDPOINT,
      clientID: import.meta.env.VITE_APP_AUTHGEAR_CLIENTID,
      sessionType: "refresh_token",
    });
  }

  async startAuthentication(...args: Parameters<typeof authgear.startAuthentication>) {
    await this.#ensureInitialized;

    return authgear.startAuthentication(...args);
  }
}

export const authClient = new AuthClient();
