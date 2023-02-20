import { ReactNode } from "react";

import { findByTestId, findByText, render } from "@testing-library/react";

import { IssueState } from "@app/generated/graphql";
import { RouterMock } from "@app/test/router-mock";

import { RepositoryIssueListItem } from "./RepositoryIssueListItem";

vi.mock("@app/components/Card", () => ({
  Card: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe("RepositoryIssueListItem", () => {
  const issue = {
    id: "1",
    number: 100,
    body: "body",
    title: "title",
    state: IssueState.Open,
    comments: { totalCount: 10 },
  };
  const issueUrl = "/repos/owner/name/issues/100";

  it("should have tag <a> with the right href", async () => {
    const { container } = render(
      <RepositoryIssueListItem issue={issue} issueUrl={issueUrl} />,
      { wrapper: RouterMock }
    );
    const link = await findByTestId(container, "issue-link");
    expect(link).toHaveAttribute("href", issueUrl);
  });

  it("should display a title", async () => {
    const { container } = render(
      <RepositoryIssueListItem issue={issue} issueUrl={issueUrl} />,
      { wrapper: RouterMock }
    );
    expect(await findByText(container, issue.title)).toBeInTheDocument();
  });

  it("should display a body", async () => {
    const { container } = render(
      <RepositoryIssueListItem issue={issue} issueUrl={issueUrl} />,
      { wrapper: RouterMock }
    );
    expect(await findByText(container, issue.body)).toBeInTheDocument();
  });

  it("should display a comments count", async () => {
    const { container } = render(
      <RepositoryIssueListItem issue={issue} issueUrl={issueUrl} />,
      { wrapper: RouterMock }
    );
    expect(
      await findByText(container, `Comments: ${issue.comments.totalCount}`)
    ).toBeInTheDocument();
  });
});
