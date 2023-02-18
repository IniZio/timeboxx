// eslint-disable-next-line import/named
import { createClient } from "urql";

export const grahpqlClient = createClient({
  url: import.meta.env.VITE_APP_GRAPHQL_PUBLIC_ENDPOINT,
});
