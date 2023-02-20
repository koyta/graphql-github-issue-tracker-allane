import { NetworkStatus } from "@apollo/client";

import { getApolloNetworkStatus } from "@app/api/helpers";
import { Button } from "@app/components/Button/Button";
import { IssueComment } from "@app/domains/issues/components/IssueComment";
import { useRepositoryIssueComments } from "@app/domains/issues/graphql/use-repository-issue-comments";

type Props = {
  repositoryName: string;
  repositoryOwner: string;
  issueNumber: number;
};

export const IssueComments = ({
  issueNumber,
  repositoryOwner,
  repositoryName,
}: Props) => {
  const { comments, fetchMoreComments, pageInfo, networkStatus } =
    useRepositoryIssueComments({
      repositoryName,
      repositoryOwner,
      issueNumber,
      first: 1,
    });

  const { isLoading, isReady, isFetchingMore } =
    getApolloNetworkStatus(networkStatus);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isReady && !comments?.length) {
    return <div>No comments</div>;
  }

  return (
    <div className="my-6">
      <ul className="flex flex-col gap-6">
        {comments.map((comment) => {
          if (!comment) {
            return null;
          }
          return (
            <li key={comment.id}>
              <IssueComment comment={comment} />
            </li>
          );
        })}
      </ul>
      {pageInfo?.hasNextPage && (
        <Button
          onClick={fetchMoreComments}
          disabled={isFetchingMore}
          className="mt-6 w-full"
        >
          Load more
        </Button>
      )}
    </div>
  );
};
