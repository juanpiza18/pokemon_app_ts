import React from "react";
import { render, screen } from "@testing-library/react";
import WithSpinner from "./withSpinner.hoc";

// Componente dummy para el HoC
const DummyComponent: React.FC<{ foo: string }> = ({ foo }) => {
  return <div className="dummy__component">{foo}</div>;
};

const MockWithSpinnerComponent = WithSpinner(DummyComponent);

describe("WithSpinner", () => {
  it("should render Spinner if loading is true", () => {
    const { container } = render(
      <MockWithSpinnerComponent loading={true} foo="hello" />
    );
    expect(container.querySelector(".spinner__overlay")).toBeInTheDocument();
  });
});
