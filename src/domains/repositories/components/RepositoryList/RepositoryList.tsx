import { ComponentProps, PropsWithChildren } from "react";

import {
  ArrowTrendingUpIcon,
  CogIcon,
  LanguageIcon,
  StarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { Button } from "@app/components/Button/Button";
import { Card } from "@app/components/Card";
import { Repository } from "@app/generated/graphql";

type Props = {
  repositories: Repository[];
  isLoading: boolean;
  isFetchingMore: boolean;
  fetchMore: () => void;
  hasNextPage?: boolean;
};

export const RepositoryList = ({
  repositories,
  fetchMore,
  isLoading,
  isFetchingMore,
  hasNextPage,
}: Props) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {repositories?.map((repo) => {
        if (!repo) {
          return null;
        }

        return <RepositoryListItem key={repo.id} data={repo} />;
      })}
      {hasNextPage && (
        <Button
          onClick={fetchMore}
          disabled={isFetchingMore}
          className="w-full"
        >
          Load more
        </Button>
      )}
    </div>
  );
};

const RepositoryListItem = ({ data }: { data: Repository }) => {
  // Just a little tw styled component
  const DataItem = ({
    children,
    ...props
  }: PropsWithChildren<ComponentProps<"span">>) => (
    <span className="flex text-xs" {...props}>
      {children}
    </span>
  );

  return (
    <Link
      key={data.id}
      to={`/repos/${data.owner.login}/${data.name}/issues`}
      className="w-full cursor-pointer"
    >
      <Card>
        <div className="relative">
          <h3>{data.name}</h3>
        </div>
        <p className="text-base">{data.description}</p>
        <div className="flex flex-row gap-2">
          <DataItem>
            <CogIcon className="h-4 w-4" />
            <strong className="pr-1">Issues</strong>
            {data.issues.totalCount}
          </DataItem>
          <DataItem>
            <StarIcon className="h-4 w-4" />
            {data.stargazers.totalCount}
          </DataItem>
          <DataItem>
            <ArrowTrendingUpIcon className="h-4 w-4" />
            <span>{data.forks.totalCount}</span>
          </DataItem>
          {data.primaryLanguage && (
            <DataItem>
              <LanguageIcon className="h-4 w-4" />
              {data.primaryLanguage?.name}
            </DataItem>
          )}
          <DataItem>{data.licenseInfo?.name}</DataItem>
          <DataItem>
            <UserCircleIcon className="h-4 w-4" />
            {data.owner.login}
          </DataItem>
        </div>
      </Card>
    </Link>
  );
};
