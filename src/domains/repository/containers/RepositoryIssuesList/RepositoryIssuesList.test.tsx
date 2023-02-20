import {
  findAllByTestId,
  findByTestId,
  fireEvent,
  render,
} from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { getApolloNetworkStatus } from "@app/api/helpers";
import { RepositoryIssuesList } from "@app/domains/repository/containers/RepositoryIssuesList";
import { useRepositoryIssues } from "@app/domains/repository/graphql/use-repository-issues";

vi.mock("@app/domains/repository/graphql/use-repository-issues", () => ({
  useRepositoryIssues: vi.fn(() => ({})),
}));
vi.mock("@app/api/helpers", () => ({
  getApolloNetworkStatus: vi.fn(() => ({})),
}));
vi.mock(
  "@app/domains/repository/components/RepositoryIssueListItem/RepositoryIssueListItem",
  () => ({
    RepositoryIssueListItem: () => <div data-testid="issues-list-item" />,
  })
);

const routeParams = {
  repositoryOwner: "test",
  repositoryName: "test",
};
const initialEntries = [
  `/${routeParams.repositoryOwner}/${routeParams.repositoryName}`,
];

const routerGood = createMemoryRouter(
  [
    {
      path: "/:repositoryOwner/:repositoryName",
      element: <RepositoryIssuesList />,
    },
  ],
  { initialEntries }
);

const routerBad = createMemoryRouter(
  [
    {
      path: "/:wrong/:param",
      element: <RepositoryIssuesList />,
    },
  ],
  { initialEntries }
);

describe("RepositoryIssuesList", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should throw an error if rendered with bad url params", async () => {
    try {
      render(<RouterProvider router={routerBad} />);
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error).toBeTruthy();
        expect(error.message).toBe(/Repository name or owner is not provided/);
      } else {
        throw error;
      }
    }
  });
  it("should not throw an error if rendered with correct url params", async () => {
    expect(() => render(<RouterProvider router={routerGood} />)).not.toThrow();
  });
  it("should call useRepositoryIssues with correct params", async () => {
    render(<RouterProvider router={routerGood} />);

    // const useRepositoryIssuesMock = vi.mocked(useRepositoryIssues);
    expect(useRepositoryIssues).toBeCalledTimes(1);
    expect(useRepositoryIssues).toBeCalledWith(
      expect.objectContaining(routeParams)
    );
  });
  it("should render null when query is not called yet", () => {
    const { container } = render(<RouterProvider router={routerGood} />);
    vi.mocked(useRepositoryIssues).mockReturnValue({
      called: false,
    } as any);
    expect(container).toBeEmptyDOMElement();
  });
  it('should render "Loading..." when called and loading', async () => {
    vi.mocked(useRepositoryIssues).mockReturnValue({
      called: true,
    } as any);
    vi.mocked(getApolloNetworkStatus).mockReturnValue({
      isLoading: true,
    } as any);
    const { container } = render(<RouterProvider router={routerGood} />);
    expect(await findByTestId(container, "loading")).toHaveTextContent(
      "Loading..."
    );
  });
  it('should render "No results" when called and no issues are returned', async () => {
    vi.mocked(useRepositoryIssues).mockReturnValue({
      called: true,
      issues: [],
    } as any);
    vi.mocked(getApolloNetworkStatus).mockReturnValue({
      isReady: true,
    } as any);
    const { container } = render(<RouterProvider router={routerGood} />);
    expect(await findByTestId(container, "no-results")).toHaveTextContent(
      "No results"
    );
  });
  it("should render happy path when query is called and issues are returned", async () => {
    vi.mocked(useRepositoryIssues).mockReturnValue({
      called: true,
      issues: [{ id: "test" }, { id: "test2" }],
    } as any);
    vi.mocked(getApolloNetworkStatus).mockReturnValue({
      isReady: true,
    } as any);
    const { container } = render(<RouterProvider router={routerGood} />);
    expect(await findByTestId(container, "issues-list")).toBeInTheDocument();
    expect(await findAllByTestId(container, "issues-list-item")).toHaveLength(
      2
    );
  });
  it('should render "Load more" button when there are more issues', async () => {
    vi.mocked(useRepositoryIssues).mockReturnValue({
      called: true,
      issues: [{ id: "test" }, { id: "test2" }],
      pageInfo: {
        hasNextPage: true,
      },
    } as any);
    vi.mocked(getApolloNetworkStatus).mockReturnValue({
      isReady: true,
    } as any);
    const { container } = render(<RouterProvider router={routerGood} />);
    expect(
      await findByTestId(container, "load-more-button")
    ).toBeInTheDocument();
  });
  it('should disable "Load more" button when loading more issues', async () => {
    vi.mocked(useRepositoryIssues).mockReturnValue({
      called: true,
      issues: [{ id: "test" }, { id: "test2" }],
      pageInfo: {
        hasNextPage: true,
      },
    } as any);
    vi.mocked(getApolloNetworkStatus).mockReturnValue({
      isFetchingMore: true,
    } as any);
    const { container } = render(<RouterProvider router={routerGood} />);
    expect(await findByTestId(container, "load-more-button")).toBeDisabled();
  });
  it('should call fetchMoreIssues when "Load more" button is clicked', async () => {
    const fetchMoreIssues = vi.fn();
    vi.mocked(useRepositoryIssues).mockReturnValue({
      called: true,
      issues: [{ id: "test" }, { id: "test2" }],
      pageInfo: {
        hasNextPage: true,
      },
      fetchMoreIssues,
    } as any);
    vi.mocked(getApolloNetworkStatus).mockReturnValue({
      isReady: true,
    } as any);
    const { container } = render(<RouterProvider router={routerGood} />);
    fireEvent.click(await findByTestId(container, "load-more-button"));
    expect(fetchMoreIssues).toBeCalledTimes(1);
  });
  it('should render "show closed issues" checkbox with "false" state by default', async () => {
    const { container } = render(<RouterProvider router={routerGood} />);
    expect(
      await findByTestId(container, "show-closed-issues-checkbox")
    ).toHaveProperty("checked", false);
  });
  it('should render "show closed issues" checkbox with enabled state when "show closed issues" checkbox is clicked', async () => {
    const { container } = render(<RouterProvider router={routerGood} />);
    fireEvent.click(
      await findByTestId(container, "show-closed-issues-checkbox")
    );
    expect(
      await findByTestId(container, "show-closed-issues-checkbox")
    ).toHaveProperty("checked", true);
  });
  it('should call useRepositoryIssues with correct params when "show closed issues" checkbox is clicked', async () => {
    const { container } = render(<RouterProvider router={routerGood} />);
    fireEvent.click(
      await findByTestId(container, "show-closed-issues-checkbox")
    );
    expect(useRepositoryIssues).toBeCalledTimes(2);
    expect(useRepositoryIssues).toBeCalledWith(
      expect.objectContaining({
        ...routeParams,
        filterBy: {
          states: ["OPEN", "CLOSED"],
        },
      })
    );
  });
});
