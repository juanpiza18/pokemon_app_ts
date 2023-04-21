import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import WithFetchPaginated from "./withFetchPaginated.hoc";
import PokemonContext from "../context/pokemonContext";

// Componente dummy para el HoC
const DummyComponent: React.FC<{ foo: string }> = ({ foo }) => {
  return <div className="dummy__component">{foo}</div>;
};

const fetchDataMock = jest.fn();
const paginationNextMock = jest.fn();
const paginationPrevMock = jest.fn();
const mockFilterAllList = jest.fn();

const DummyContext = React.createContext({
  loading: false,
  dataList: [],
  filteredList: [],
  filterAllList: mockFilterAllList,
  fetchData: fetchDataMock,
  paginationNext: paginationNextMock,
  paginationPrev: paginationPrevMock,
});

const MockWithFetchComponent = WithFetchPaginated(DummyComponent, DummyContext);

describe("WithFetchPaginated", () => {
  it("should render With Fetch Paginated and Match snapshot", () => {
    const { container } = render(<MockWithFetchComponent />);
    expect(screen.getByTestId("list")).toBeTruthy();
    expect(screen.getByTestId("pagination")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it("should call fetchData on mount", () => {
    render(<MockWithFetchComponent />);
    expect(fetchDataMock).toHaveBeenCalledTimes(1);
  });

  it("should call pagination prve on click", () => {
    const { container } = render(<MockWithFetchComponent />);
    fireEvent.click(container.querySelectorAll("button")[0]);
    expect(paginationPrevMock).toHaveBeenCalledTimes(1);
  });

  it("should call pagination next on click", () => {
    const { container } = render(<MockWithFetchComponent />);
    fireEvent.click(container.querySelectorAll("button")[1]);
    expect(paginationNextMock).toHaveBeenCalledTimes(1);
  });

  it("should filter data when filter is not null", async () => {
    await waitFor(() => {
      render(<MockWithFetchComponent filter="Bulbasaur" />);
    });
    expect(fetchDataMock).not.toHaveBeenCalled();
    expect(mockFilterAllList).toHaveBeenCalledWith("Bulbasaur");
  });
});
