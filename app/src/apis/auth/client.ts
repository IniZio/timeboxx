import authgear from "@authgear/web";

class AuthClient {
  #ensureInitialized: Promise<void>;

  constructor() {
    this.#ensureInitialized = authgear.configure({
      endpoint: import.meta.env.DEV
        ? import.meta.env.VITE_APP_AUTHGEAR_ENDPOINT
        : window.__timeboxx_config.AUTHGEAR_ENDPOINT,
      clientID: import.meta.env.DEV
        ? import.meta.env.VITE_APP_AUTHGEAR_CLIENTID
        : window.__timeboxx_config.AUTHGEAR_CLIENTID,
      sessionType: "refresh_token",
    });
  }

  async initialize() {
    await this.#ensureInitialized;
  }

  fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    await this.#ensureInitialized;

    const _input = input instanceof URL ? input.toString() : input;

    return authgear.fetch(_input, init);
  };

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

  async logout(...args: Parameters<typeof authgear.logout>) {
    await this.#ensureInitialized;
    return authgear.logout(...args);
  }
}

export const authClient = new AuthClient();
