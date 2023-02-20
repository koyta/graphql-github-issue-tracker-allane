import { fireEvent, render } from "@testing-library/react";

import { Button } from "./Button";

describe("Button", () => {
  it("should render a button", () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container).toMatchSnapshot();
  });
  it("should render a button with a custom class", () => {
    const { container } = render(
      <Button className="custom-class">Click me</Button>
    );
    expect(container).toMatchSnapshot();
  });
  it("should render a button with a custom type", () => {
    const { container } = render(<Button type="submit">Click me</Button>);
    expect(container).toMatchSnapshot();
  });
  it('should contain "Click me" text', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });
  it("should be disabled", () => {
    const clickSpy = vi.fn();
    const { baseElement } = render(
      <Button disabled onClick={clickSpy}>
        Click me
      </Button>
    );
    fireEvent.click(baseElement);
    expect(clickSpy).not.toHaveBeenCalled();
  });
});
