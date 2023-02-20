import { useEffect } from "react";

import { getApolloNetworkStatus } from "@app/api/helpers";
import { RepositoryList } from "@app/domains/repositories/components/RepositoryList";
import { useRepositorySearch } from "@app/domains/repositories/graphql/use-repository-search";

type Props = {
  search?: string;
};

export const RepositoryListContainer = ({ search = "" }: Props) => {
  const {
    repositories,
    getRepositories,
    repositoryCount,
    fetchMoreRepos,
    pageInfo,
    networkStatus,
    called,
  } = useRepositorySearch({ query: search });

  useEffect(() => {
    if (search) {
      getRepositories({ query: search });
    }
  }, [search, getRepositories]);

  const { isFetchingMore, isLoading, isReady } =
    getApolloNetworkStatus(networkStatus);

  if (!called) {
    return null;
  }

  if (isReady && !repositoryCount) {
    return <div>No repositories found</div>;
  }

  return (
    <RepositoryList
      repositories={repositories}
      fetchMore={fetchMoreRepos}
      isLoading={isLoading}
      isFetchingMore={isFetchingMore}
      hasNextPage={pageInfo?.hasNextPage}
    />
  );
};
