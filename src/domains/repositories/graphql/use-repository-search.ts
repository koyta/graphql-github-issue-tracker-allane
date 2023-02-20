import { useCallback, useMemo } from "react";

import { useDebouncedCallback } from "use-debounce";

import {
  Repository,
  useRepositorySearchLazyQuery,
} from "@app/generated/graphql";

export const useRepositorySearch = ({
  first = 1,
  after,
  query,
}: {
  query: string;
  first?: number;
  after?: string;
}) => {
  const [, { data, fetchMore, refetch, ...restQuery }] =
    useRepositorySearchLazyQuery({
      variables: { first, after, query },
    });

  const getRepositoriesDebounced = useDebouncedCallback(refetch, 500);

  const { pageInfo, repositories } = useMemo(
    () => ({
      /**
       * Nodes with data of type Repository
       * */
      repositories: data?.search.edges
        ?.map((edge) => edge?.node)
        .filter((node) => node?.__typename === "Repository") as Repository[],
      pageInfo: data?.search.pageInfo,
    }),
    [data]
  );

  const fetchMoreRepos = useCallback(async () => {
    if (!data?.search.pageInfo?.hasNextPage) {
      return;
    }
    return fetchMore({
      variables: { after: pageInfo?.endCursor },
    });
  }, [data?.search.pageInfo?.hasNextPage, fetchMore, pageInfo?.endCursor]);

  return {
    repositories,
    pageInfo,
    getRepositories: getRepositoriesDebounced,
    fetchMoreRepos,
    repositoryCount: data?.search.repositoryCount,
    ...restQuery,
  };
};
