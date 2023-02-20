import { InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

import generatedIntrospection from "@app/generated/fragment-matcher";
import { StrictTypedTypePolicies } from "@app/generated/helpers";

export const apolloCache = new InMemoryCache({
  possibleTypes: generatedIntrospection.possibleTypes,
  typePolicies: {
    Query: {
      fields: {
        search: relayStylePagination(["query", "type", "first"]),
      },
    },
    Repository: {
      fields: {
        issues: relayStylePagination([
          "filterBy",
          "first",
          "orderBy",
          "states",
        ]),
      },
    },
    Issue: {
      fields: {
        comments: relayStylePagination(["first"]),
      },
    },
  } satisfies StrictTypedTypePolicies,
});
