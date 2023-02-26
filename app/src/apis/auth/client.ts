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

  async initialize() {
    await this.#ensureInitialized;
  }

  async startAuthentication(...args: Parameters<typeof authgear.startAuthentication>) {
    await this.#ensureInitialized;

    return authgear.startAuthentication(...args);
  }

  async finishAuthentication(...args: Parameters<typeof authgear.finishAuthentication>) {
    await this.#ensureInitialized;

    return authgear.finishAuthentication(...args);
  }

  async fetchUserInfo(...args: Parameters<typeof authgear.fetchUserInfo>) {
    await this.#ensureInitialized;

    return authgear.fetchUserInfo(...args);
  }
}

export const authClient = new AuthClient();
