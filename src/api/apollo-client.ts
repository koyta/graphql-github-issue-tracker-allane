import { ApolloClient, concat, createHttpLink } from "@apollo/client";

import { apolloCache } from "./apollo-cache";
import { authMiddleware } from "./middlewares/auth-middleware";

const httpLink = createHttpLink({ uri: "https://api.github.com/graphql" });

export const apolloClient = new ApolloClient({
  cache: apolloCache,
  link: concat(authMiddleware, httpLink),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    },
    watchQuery: {
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    },
  },
});
