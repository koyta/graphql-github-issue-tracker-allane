import { useState } from "react";

import { useParams } from "react-router-dom";

import { getApolloNetworkStatus } from "@app/api/helpers";
import { Button } from "@app/components/Button/Button";
import { RepositoryIssueListItem } from "@app/domains/repository/components/RepositoryIssueListItem/RepositoryIssueListItem";
import { useRepositoryIssues } from "@app/domains/repository/graphql/use-repository-issues";
import { IssueState } from "@app/generated/graphql";

export const RepositoryIssuesList = () => {
  const { repositoryName, repositoryOwner } = useParams<{
    repositoryOwner: string;
    repositoryName: string;
  }>();

  if (!repositoryName || !repositoryOwner) {
    throw new Error("Repository name or owner is not provided");
  }

  const [includeClosed, setIncludeClosed] = useState(false);

  const { issues, fetchMoreIssues, pageInfo, networkStatus, called } =
    useRepositoryIssues({
      repositoryName,
      repositoryOwner,
      first: 1,
      filterBy: {
        states: includeClosed
          ? [IssueState.Open, IssueState.Closed]
          : [IssueState.Open],
      },
    });

  const { isFetchingMore, isLoading, isReady } =
    getApolloNetworkStatus(networkStatus);

  if (!called) {
    return null;
  }

  if (isLoading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (isReady && !issues?.length) {
    return <div data-testid="no-results">No results</div>;
  }

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="border-2 p-2 mb-3 rounded-sm">
        <label
          htmlFor="include-closed"
          className="select-none cursor-pointer mb-10"
        >
          <input
            id="include-closed"
            type="checkbox"
            checked={includeClosed}
            onChange={(e) => setIncludeClosed(e.target.checked)}
            className="mr-2"
            data-testid="show-closed-issues-checkbox"
          />
          Include closed issues
        </label>
      </div>

      <div className="p-2" data-testid="issues-list">
        {issues?.map((issue) => {
          const issueUrl = `/repos/${repositoryOwner}/${repositoryName}/issues/${issue.number}`;
          return (
            <RepositoryIssueListItem
              key={issue.id}
              issue={issue}
              issueUrl={issueUrl}
            />
          );
        })}
      </div>
      {pageInfo?.hasNextPage && (
        <Button
          onClick={fetchMoreIssues}
          disabled={isFetchingMore}
          className="w-full"
          data-testid="load-more-button"
        >
          Load more
        </Button>
      )}
    </div>
  );
};
