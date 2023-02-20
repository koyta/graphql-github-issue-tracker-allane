import { Link } from "react-router-dom";

import { Card } from "@app/components/Card";
import { useRepositoryIssues } from "@app/domains/repository/graphql/use-repository-issues";
import { Issue, RepositoryIssuesQuery } from "@app/generated/graphql";

type Props = {
  issue: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<
            NonNullable<RepositoryIssuesQuery>["repository"]
          >["issues"]
        >["edges"]
      >[number]
    >["node"]
  >;
  issueUrl: string;
};

export const RepositoryIssueListItem = ({ issue, issueUrl }: Props) => {
  return (
    <Link key={issue.id} to={issueUrl} data-testid="issue-link">
      <Card>
        <h4 className="font-bold">{issue.title}</h4>
        <p className="text-base line-clamp-2">{issue.body}</p>
        <p>Comments: {issue.comments.totalCount}</p>
      </Card>
    </Link>
  );
};
