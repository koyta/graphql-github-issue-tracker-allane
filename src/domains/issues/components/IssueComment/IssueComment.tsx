import { UserIcon } from "@heroicons/react/24/outline";

import { RepositoryIssueCommentsQuery } from "@app/generated/graphql";

type Props = {
  comment: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<
            NonNullable<RepositoryIssueCommentsQuery["repository"]>["issue"]
          >["comments"]
        >["edges"]
      >[number]
    >["node"]
  >;
};

export const IssueComment = ({ comment }: Props) => {
  return (
    <div className="flex flex-row gap-2 items-start">
      <div className="flex flex-col rounded-full basis-6">
        <UserIcon className="h-6 w-6" />
      </div>
      <div className="flex flex-col grow-0 shrink-1">
        <p className="text-base font-bold">{comment.author?.login}</p>
        <p className="text-base mt-2">{comment.body}</p>
      </div>
    </div>
  );
};
