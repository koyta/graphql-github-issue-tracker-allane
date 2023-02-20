import { findByText, render } from "@testing-library/react";

import { IssueComment } from "@app/domains/issues/components/IssueComment/IssueComment";

describe("IssueComment", () => {
  const comment = {
    body: "body",
    author: {
      login: "author",
    },
  };

  it("should render a comment body", async () => {
    const { container } = render(<IssueComment comment={comment as any} />);
    expect(await findByText(container, comment.body)).toHaveTextContent(
      comment.body
    );
  });
  it("should render a comment author", async () => {
    const { container } = render(<IssueComment comment={comment as any} />);
    expect(await findByText(container, comment.author.login)).toHaveTextContent(
      comment.author.login
    );
  });
});
