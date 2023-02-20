import { useCallback, useMemo } from "react";

import {
  RepositoryIssuesQueryVariables,
  useRepositoryIssuesQuery,
} from "@app/generated/graphql";
import { notEmpty } from "@app/utils/notEmpty";

export const useRepositoryIssues = (
  variables: RepositoryIssuesQueryVariables
) => {
  const { data, fetchMore, ...query } = useRepositoryIssuesQuery({
    variables,
  });

  const { issues, pageInfo } = useMemo(
    () => ({
      issues: data?.repository?.issues.edges
        ?.map((edge) => edge?.node)
        .filter(notEmpty),
      pageInfo: data?.repository?.issues.pageInfo,
    }),
    [data]
  );

  const fetchMoreIssues = useCallback(() => {
    if (!pageInfo?.hasNextPage) {
      return;
    }

    return fetchMore({
      variables: { after: pageInfo?.endCursor },
    });
  }, [fetchMore, pageInfo, variables]);

  return {
    issues,
    pageInfo,
    fetchMoreIssues,
    ...query,
  };
};
