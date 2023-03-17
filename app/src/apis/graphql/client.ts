// import { offlineExchange } from '@urql/exchange-graphcache';
// eslint-disable-next-line import/named
import { createClient } from "urql";

import { authClient } from "@/apis/auth/client";

// import schema from "./generated/introspection.json";

// const cache = offlineExchange({
//   schema,
//   updates: {
//     Mutation: {
//       updateTask(args, cache, info) {
//         return {
//           __typename: 'Task',
//           id: args.id,
//           status: args.status,
//         };
//       }
//     },
//   },
// });

export const grahpqlClient = createClient({
  url: import.meta.env.DEV
    ? import.meta.env.VITE_APP_GRAPHQL_PUBLIC_ENDPOINT
    : window.__timeboxx_config.GRAPHQL_PUBLIC_ENDPOINT,
  fetch: authClient.fetch,
  // exchanges: [cache],
});
