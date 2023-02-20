import { fireEvent, render } from "@testing-library/react";

import { TextInput } from "@app/components/TextInput/TextInput";

describe("TextInput", () => {
  it("should render a text input", () => {
    const { container } = render(<TextInput />);
    expect(container).toMatchSnapshot();
  });
  it("should be controlled", () => {
    const { container } = render(<TextInput value="Hello" />);
    const input = container.querySelector("input");
    if (!input) {
      throw new Error("Input not found");
    }
    expect(input).toHaveValue("Hello");
  });
  it("should call onChange callback on change", () => {
    const onChange = vi.fn();
    const { container } = render(<TextInput onChange={onChange} />);
    const input = container.querySelector("input");
    if (!input) {
      throw new Error("Input not found");
    }
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(onChange).toHaveBeenCalledWith("Hello");
  });
  it("should be disabled", () => {
    const onChange = vi.fn();
    const { container } = render(<TextInput disabled onChange={onChange} />);
    const input = container.querySelector("input");
    if (!input) {
      throw new Error("Input not found");
    }
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(onChange).not.toHaveBeenCalled();
  });
  it("should render a text input with a custom class", () => {
    const { container } = render(<TextInput className="custom-class" />);
    expect(container).toMatchSnapshot();
  });
});
