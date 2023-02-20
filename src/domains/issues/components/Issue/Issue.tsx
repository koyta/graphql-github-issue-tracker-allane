// import { NonNullable } from "ts-toolbelt/out/Object/NonNullable";

import { UserIcon } from "@heroicons/react/24/outline";

import { IssueComments } from "@app/domains/issues/containers/IssueComments";
import { RepositoryIssueQuery } from "@app/generated/graphql";

type Props = {
  repositoryName: string;
  repositoryOwner: string;
  issue: NonNullable<
    NonNullable<NonNullable<RepositoryIssueQuery>["repository"]>["issue"]
  >;
};

export const Issue = ({ issue, repositoryName, repositoryOwner }: Props) => {
  return (
    <div>
      <div className="bg-blue-50 shadow shadow-md shadow-slate-100 rounded-md p-3">
        <h3 className="font-bold text-xl">
          Issue #{issue.number}: {issue.title}
        </h3>
        <div className="flex flex-row gap-2 items-start mt-4">
          <div className="flex flex-col rounded-full basis-6">
            <UserIcon className="h-6 w-6" />
          </div>
          <div className="flex flex-col grow-0 shrink-1">
            <p className="text-base font-bold">{issue.author?.login}</p>
            <p className="text-base mt-2">{issue.body}</p>
          </div>
        </div>
      </div>
      <IssueComments
        repositoryName={repositoryName}
        repositoryOwner={repositoryOwner}
        issueNumber={issue.number}
      />
    </div>
  );
};
