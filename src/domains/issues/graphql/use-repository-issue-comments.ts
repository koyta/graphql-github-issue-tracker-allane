import { useCallback, useMemo } from "react";

import {
  RepositoryIssueCommentsQueryVariables,
  useRepositoryIssueCommentsQuery,
} from "@app/generated/graphql";

export const useRepositoryIssueComments = (
  variables: RepositoryIssueCommentsQueryVariables
) => {
  const { data, fetchMore, ...query } = useRepositoryIssueCommentsQuery({
    variables,
  });

  const { pageInfo, comments } = useMemo(
    () => ({
      pageInfo: data?.repository?.issue?.comments?.pageInfo,
      comments:
        data?.repository?.issue?.comments?.edges?.map((e) => e?.node) ?? [],
    }),
    [data]
  );

  const fetchMoreComments = useCallback(() => {
    if (!pageInfo?.hasNextPage) return;

    return fetchMore({
      variables: { after: pageInfo?.endCursor },
    });
  }, [fetchMore, pageInfo?.endCursor, pageInfo?.hasNextPage]);

  return { comments, fetchMoreComments, pageInfo, ...query };
};
