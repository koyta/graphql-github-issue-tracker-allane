import { useRepositoryIssueQuery } from "@app/generated/graphql";

export const useRepositoryIssue = (variables: {
  repositoryName: string;
  repositoryOwner: string;
  issueNumber: number;
}) => {
  const { data, ...query } = useRepositoryIssueQuery({
    variables,
  });

  return {
    issue: data?.repository?.issue,
    ...query,
  };
};
