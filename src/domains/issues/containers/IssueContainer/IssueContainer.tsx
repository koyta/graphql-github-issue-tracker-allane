import { useParams } from "react-router-dom";

import { Issue } from "@app/domains/issues/components/Issue";
import { useRepositoryIssue } from "@app/domains/issues/graphql/use-repository-issue";

export const IssueContainer = () => {
  const { repositoryName, repositoryOwner, issueNumber } = useParams<{
    repositoryOwner: string;
    repositoryName: string;
    issueNumber: string;
  }>();

  if (!repositoryName || !repositoryOwner || !issueNumber) {
    throw new Error("Invalid params");
  }

  const { issue, loading } = useRepositoryIssue({
    repositoryName,
    repositoryOwner,
    issueNumber: parseInt(issueNumber, 10),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!issue) {
    return <div>Issue not found</div>;
  }

  return (
    <Issue
      issue={issue}
      repositoryOwner={repositoryOwner}
      repositoryName={repositoryName}
    />
  );
};
