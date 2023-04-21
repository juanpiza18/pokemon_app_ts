import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PokemonContainer from "./pokemon.container";
import PokemonContext, {
  PokemonContextDefinitions,
} from "../../context/pokemonContext";

describe("PokemonContainer", () => {
  beforeEach(() => {
    jest.spyOn(React, "useContext").mockReturnValue({
      value: "mocked value",
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render without error", () => {
    const contextMockValue: PokemonContextDefinitions = {
      loading: false,
      dataList: [],
      filteredList: [],
      offset: 0,
      pokemonLoading: false,
      filterAllList: jest.fn(),
      fetchData: jest.fn(),
      paginationNext: jest.fn(),
      paginationPrev: jest.fn(),
      fetchPokemonData: jest.fn(),
      setIndividualPokemonLoading: jest.fn(),
    };
    render(
      <PokemonContext.Provider value={contextMockValue}>
        <PokemonContainer filter={null} />
      </PokemonContext.Provider>
    );
    expect(screen.getByTestId("pokemon-list")).toBeTruthy();
    expect(screen.getByTestId("pagination")).toBeTruthy();
  });

  it("fetchData function should be called on mount", async () => {
    const fetchDataMock = jest.fn();
    const contextMockValue: PokemonContextDefinitions = {
      loading: false,
      dataList: [],
      filteredList: [],
      offset: 0,
      pokemonLoading: false,
      filterAllList: jest.fn(),
      fetchData: fetchDataMock,
      paginationNext: jest.fn(),
      paginationPrev: jest.fn(),
      fetchPokemonData: jest.fn(),
      setIndividualPokemonLoading: jest.fn(),
    };
    render(
      <PokemonContext.Provider value={contextMockValue}>
        <PokemonContainer />
      </PokemonContext.Provider>
    );
    expect(fetchDataMock).toHaveBeenCalledTimes(1);
  });

  it("filterAllList function should be called when filter is sent in the props", async () => {
    const filterMock = jest.fn();
    const contextMockValue: PokemonContextDefinitions = {
      loading: false,
      dataList: [],
      filteredList: [],
      offset: 0,
      pokemonLoading: false,
      filterAllList: filterMock,
      fetchData: jest.fn(),
      paginationNext: jest.fn(),
      paginationPrev: jest.fn(),
      fetchPokemonData: jest.fn(),
      setIndividualPokemonLoading: jest.fn(),
    };
    render(
      <PokemonContext.Provider value={contextMockValue}>
        <PokemonContainer filter="Bulbasaur" />
      </PokemonContext.Provider>
    );
    expect(filterMock).toHaveBeenCalledTimes(1);
  });

  it("Pagination functions should be called on user click", async () => {
    const mockPaginationNext = jest.fn();
    const mockPaginationPrev = jest.fn();
    const contextMockValue: PokemonContextDefinitions = {
      loading: false,
      dataList: [],
      filteredList: [],
      offset: 0,
      pokemonLoading: false,
      filterAllList: jest.fn(),
      fetchData: jest.fn(),
      paginationNext: mockPaginationNext,
      paginationPrev: mockPaginationPrev,
      fetchPokemonData: jest.fn(),
      setIndividualPokemonLoading: jest.fn(),
    };
    const { container } = render(
      <PokemonContext.Provider value={contextMockValue}>
        <PokemonContainer />
      </PokemonContext.Provider>
    );

    fireEvent.click(container.querySelectorAll("button")[1]);
    expect(mockPaginationNext).toHaveBeenCalledTimes(1);

    fireEvent.click(container.querySelectorAll("button")[0]);
    expect(mockPaginationPrev).toHaveBeenCalledTimes(1);
  });

  it("Loading is true it shoudl render spinner component", async () => {
    const contextMockValue: PokemonContextDefinitions = {
      loading: true,
      dataList: [],
      filteredList: [],
      offset: 0,
      pokemonLoading: false,
      filterAllList: jest.fn(),
      fetchData: jest.fn(),
      paginationNext: jest.fn(),
      paginationPrev: jest.fn(),
      fetchPokemonData: jest.fn(),
      setIndividualPokemonLoading: jest.fn(),
    };
    const { container } = render(
      <PokemonContext.Provider value={contextMockValue}>
        <PokemonContainer />
      </PokemonContext.Provider>
    );
    expect(container.querySelector(".spinner__overlay")).toBeInTheDocument();
  });
});
