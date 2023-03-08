// eslint-disable-next-line import/named
import { createClient } from "urql";

import { authClient } from "@/apis/auth/client";

export const grahpqlClient = createClient({
  url: import.meta.env.VITE_APP_GRAPHQL_PUBLIC_ENDPOINT,
  fetch: authClient.fetch,
});
