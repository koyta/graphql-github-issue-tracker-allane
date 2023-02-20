import { PropsWithChildren } from "react";

import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import { apolloClient } from "@app/api/apollo-client";

type Props = PropsWithChildren<Record<never, never>>;

export const AppProviders = ({ children }: Props) => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </ApolloProvider>
  );
};
