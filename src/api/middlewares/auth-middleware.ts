import { ApolloLink } from "@apollo/client";

export const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  });
  return forward(operation);
});
