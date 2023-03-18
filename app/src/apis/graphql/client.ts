import { offlineExchange as createOfflineExchange } from "@urql/exchange-graphcache";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";
import { refocusExchange as createRefocusExchange } from "@urql/exchange-refocus";
import { IntrospectionQuery } from "graphql";
// eslint-disable-next-line import/named
import { createClient, dedupExchange, errorExchange as createErrorExchange, Exchange, fetchExchange } from "urql";

import { authClient } from "@/apis/auth/client";
import { keys } from "@/apis/graphql/caching/keys";
import { optimistic } from "@/apis/graphql/caching/optimistic";
import { updates } from "@/apis/graphql/caching/updates";
import { Routes } from "@/Router";

import introspection from "./generated/introspection.json";

const storage = makeDefaultStorage({
  idbName: "timeboxx-graphcache",
  maxAge: 1,
});

const offlineExchange = createOfflineExchange({
  schema: introspection as unknown as IntrospectionQuery,
  storage,
  keys,
  updates,
  optimistic,
});

const errorExchange = createErrorExchange({
  onError: (error) => {
    if (error.response?.status === 401) {
      authClient.logout({ force: true, redirectURI: new URL(Routes.Home, location.href).href });
    }
  },
});

export const grahpqlClient = createClient({
  url: import.meta.env.DEV
    ? import.meta.env.VITE_APP_GRAPHQL_PUBLIC_ENDPOINT
    : window.__timeboxx_config.GRAPHQL_PUBLIC_ENDPOINT,
  fetch: authClient.fetch,
  exchanges: [dedupExchange, createRefocusExchange(), offlineExchange, errorExchange, fetchExchange] as Exchange[],
});
