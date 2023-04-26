import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useContext, useEffect } from "react";
import { act } from "react-dom/test-utils";
import { Pokemon } from "../models/pokemon.type";
import * as API from "../utils/pokemonApi";
import PokemonContext from "./pokemonContext";
import { PokemonProvider } from "./pokemonProvider";
import {
  createPokemonsMockPayload,
  createPokemonsNameAndUrlMockPayload,
} from "../utils/testUtils";

/*
 * Dummy components to test the Provider with the different functions that it provides.
 */

const TestingComponentPokemonList = () => {
  const { dataList, fetchData } = useContext(PokemonContext);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <div>
        {dataList.map((todo, index) => (
          <p key={index} data-testid={`pokemon-${index}`}>
            {todo.name}
          </p>
        ))}
      </div>
    </>
  );
};

const TestingComponentPokemon = () => {
  const { pokemon, pokemonLoading, fetchPokemonData } =
    useContext(PokemonContext);
  useEffect(() => {
    fetchPokemonData(1);
  }, [fetchPokemonData]);
  return (
    <>
      <div>
        {pokemonLoading ? (
          <p data-testid="loading-pokemon"> Loading pokemon info </p>
        ) : (
          <div>
            <span data-testid="pokemon-name">{pokemon?.name}</span>
          </div>
        )}
      </div>
    </>
  );
};

const TestingComponentAllPokemons = ({ filter }: any) => {
  const { loading, filteredList, filterAllList } = useContext(PokemonContext);
  useEffect(() => {
    filterAllList(filter);
  }, [filterAllList]);
  return (
    <>
      <div>
        {loading ? (
          <p data-testid="loading-pokemon"> Loading pokemon info </p>
        ) : (
          <div>
            {filteredList.map((pokemon) => (
              <span key={pokemon.id} data-testid={`pokemon-name-${pokemon.id}`}>
                {pokemon?.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TestingComponentPagination = () => {
  const { dataList, loading, fetchData, paginationNext, paginationPrev } =
    useContext(PokemonContext);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div>
        <div>
          <button
            data-testid="button-prev"
            onClick={() => {
              paginationPrev();
            }}
          >
            Prev
          </button>
          <button
            data-testid="button-next"
            onClick={() => {
              paginationNext();
            }}
          >
            Next
          </button>
        </div>
        {loading ? (
          <span data-testid="loading"> Loading data </span>
        ) : (
          dataList.map((pokemon) => (
            <span key={pokemon.id} data-testid={`pokemon${pokemon.id}`}>
              {pokemon.name}
            </span>
          ))
        )}
      </div>
    </>
  );
};

const TestingPokemonLoadingComponent = () => {
  const { pokemonLoading, setIndividualPokemonLoading } =
    useContext(PokemonContext);
  return (
    <div>
      <button
        onClick={() => {
          setIndividualPokemonLoading();
        }}
        data-testid="change-value"
      >
        Change Loading Value
      </button>
      <span data-testid="loading">
        {pokemonLoading ? "loading true" : "loading false"}
      </span>
    </div>
  );
};

describe("Pokemon Provider Test", () => {
  it("renders without crashing", async () => {
    const mockResponse = createPokemonsNameAndUrlMockPayload(3);
    const mockPokemonData = createPokemonsMockPayload(3);
    const mockResponseJson = jest.fn().mockResolvedValue(mockResponse);
    const mockFetch = jest.fn().mockResolvedValue({ json: mockResponseJson });
    global.fetch = mockFetch as any;
    jest
      .spyOn(API, "getPokemonListByOffset")
      .mockImplementation(async (offset: number) => {
        return mockPokemonData;
      });

    const { getByTestId } = render(
      <PokemonProvider>
        <TestingComponentPokemonList />
      </PokemonProvider>
    );
    waitFor(() => {
      expect(getByTestId("pokemon-0")).toBeInTheDocument();
      expect(getByTestId("pokemon-1")).toBeInTheDocument();
    });
  });

  it("fetches Pokemon data by id", () => {
    const mockResponse = createPokemonsMockPayload(1)[0];
    const mockResponseJson = jest.fn().mockResolvedValue(mockResponse);
    const mockFetch = jest.fn().mockResolvedValue({ json: mockResponseJson });
    global.fetch = mockFetch as any;
    jest.spyOn(API, "getPokemonById").mockImplementation(async (id: number) => {
      return mockResponse;
    });
    const { getByTestId } = render(
      <PokemonProvider>
        <TestingComponentPokemon />
      </PokemonProvider>
    );
    waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(getByTestId("pokemon-name")).toBeInTheDocument();
    });
  });

  it("fetches All Pokemon and filter list data", () => {
    const mockResponse = createPokemonsNameAndUrlMockPayload(3);
    const mockPokemonData: Pokemon[] = createPokemonsMockPayload(3);
    const mockResponseJson = jest.fn().mockResolvedValue(mockResponse);
    const mockFetch = jest.fn().mockResolvedValue({ json: mockResponseJson });
    global.fetch = mockFetch as any;
    jest.spyOn(API, "getAllPokemons").mockImplementation(async () => {
      return mockPokemonData;
    });

    const { getByTestId, queryByTestId } = render(
      <PokemonProvider>
        <TestingComponentAllPokemons filter={mockPokemonData[0].name} />
      </PokemonProvider>
    );
    waitFor(() => {
      expect(getByTestId("pokemon-name-1")).toBeInTheDocument();
      expect(queryByTestId("pokemon-name-2")).not.toBeInTheDocument();
    });
  });

  it("test pagination next offset when we request the next page", () => {
    const mockResponse = createPokemonsNameAndUrlMockPayload(21);
    const mockResponseJson = jest.fn().mockResolvedValue(mockResponse);
    const mockFetch = jest.fn().mockResolvedValue({ json: mockResponseJson });
    global.fetch = mockFetch as any;
    jest
      .spyOn(API, "getPokemonListByOffset")
      .mockImplementation(async (id: number) => {
        const indexStart = id === 0 ? 1 : 21;
        return createPokemonsMockPayload(21, indexStart);
      });
    const { getByTestId, queryByTestId, queryAllByTestId } = render(
      <PokemonProvider>
        <TestingComponentPagination />
      </PokemonProvider>
    );
    waitFor(() => {
      expect(queryByTestId("pokemon1")).toBeInTheDocument();
    });
    fireEvent.click(getByTestId("button-next"));
    waitFor(() => {
      expect(getByTestId("loading")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(queryByTestId("loading")).not.toBeInTheDocument();
      expect(queryByTestId("pokemon23")).toBeInTheDocument();
    });
  });

  it("test pagination prev offset when we request the prev page (page should not change)", () => {
    const mockResponse = createPokemonsNameAndUrlMockPayload(21);
    const mockResponseJson = jest.fn().mockResolvedValue(mockResponse);
    const mockFetch = jest.fn().mockResolvedValue({ json: mockResponseJson });
    global.fetch = mockFetch as any;
    jest
      .spyOn(API, "getPokemonListByOffset")
      .mockImplementation(async (id: number) => {
        return createPokemonsMockPayload(21);
      });
    render(
      <PokemonProvider>
        <TestingComponentPagination />
      </PokemonProvider>
    );
    waitFor(() => {
      expect(screen.queryByTestId("pokemon1")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("button-prev"));
    waitFor(() => {
      expect(screen.queryByTestId("pokemon1")).toBeInTheDocument();
    });
  });

  it("test pagination next offset when we request the next page and then request prev page", () => {
    const mockResponse = createPokemonsNameAndUrlMockPayload(21);
    const mockResponseJson = jest.fn().mockResolvedValue(mockResponse);
    const mockFetch = jest.fn().mockResolvedValue({ json: mockResponseJson });
    global.fetch = mockFetch as any;
    jest
      .spyOn(API, "getPokemonListByOffset")
      .mockImplementation(async (id: number) => {
        const indexStart = id === 0 ? 1 : 21;
        return createPokemonsMockPayload(21, indexStart);
      });
    render(
      <PokemonProvider>
        <TestingComponentPagination />
      </PokemonProvider>
    );
    waitFor(() => {
      expect(screen.queryByTestId("pokemon1")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("button-next"));
    waitFor(() => {
      expect(screen.queryByTestId("pokemon23")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("button-prev"));
    waitFor(() => {
      expect(screen.queryByTestId("pokemon1")).toBeInTheDocument();
    });
  });

  it("should change pokemonLoading when function is executed ", () => {
    render(
      <PokemonProvider>
        <TestingPokemonLoadingComponent />
      </PokemonProvider>
    );
    expect(screen.getByTestId<HTMLSpanElement>("loading").textContent).toBe(
      "loading true"
    );
    fireEvent.click(screen.getByTestId("change-value"));
    waitFor(() => {
      expect(screen.getByTestId<HTMLSpanElement>("loading").textContent).toBe(
        "loading false"
      );
    });
  });
});
