import { render, screen } from "@testing-library/react";
import CardList, { PokemonListProps } from "./cardList.component";
import { MemoryRouter } from "react-router-dom";
import { Pokemon } from "../../models/pokemon.type";

describe("CardListComponent", () => {
  const props: PokemonListProps = {
    list: [
      {
        id: 1,
        name: "pokemon 1",
        order: 1,
        weight: 120,
        height: 120,
        sprites: {
          front_default: "default",
          back_default: null,
          back_female: null,
          back_shiny: null,
          back_shiny_female: null,
          front_female: null,
          front_shiny: null,
          front_shiny_female: null,
          other: {
            home: null,
            "official-artwork": null,
            dream_world: null,
          },
        },
        moves: [],
        stats: [],
        types: [],
        base_experience: 1,
      },
      {
        id: 2,
        name: "pokemon 2",
        order: 1,
        weight: 120,
        height: 120,
        sprites: {
          front_default: "default",
          back_default: null,
          back_female: null,
          back_shiny: null,
          back_shiny_female: null,
          front_female: null,
          front_shiny: null,
          front_shiny_female: null,
          other: {
            home: null,
            "official-artwork": null,
            dream_world: null,
          },
        },
        moves: [],
        stats: [],
        types: [],
        base_experience: 1,
      },
    ],
  };

  it("should render card list component", () => {
    render(
      <MemoryRouter>
        <CardList loading={false} {...props} />
      </MemoryRouter>
    );
    const imageAlt = screen.getAllByAltText(`Pokemon`, {
      exact: false,
    });
    expect(imageAlt.length).toBe(2);
  });

  it("should render pokemons not found, if list prop is empty", () => {
    render(
      <MemoryRouter>
        <CardList loading={false} list={[]} />
      </MemoryRouter>
    );
    const notFoundText = screen.getByText("No pokemons found");
    expect(notFoundText).toBeInTheDocument();
  });

  it("should render an empty alt for the image if front default and other image are null", () => {
    const pokemon: Pokemon = {
      id: 1,
      name: "pokemon null alt",
      order: 1,
      weight: 120,
      height: 120,
      sprites: {
        front_default: null,
        back_default: null,
        back_female: null,
        back_shiny: null,
        back_shiny_female: null,
        front_female: null,
        front_shiny: null,
        front_shiny_female: null,
        other: {
          home: null,
          "official-artwork": null,
          dream_world: null,
        },
      },
      moves: [],
      stats: [],
      types: [],
      base_experience: 1,
    };
    render(
      <MemoryRouter>
        <CardList loading={false} list={[pokemon]} />
      </MemoryRouter>
    );
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toEqual("http://localhost/");
  });
});
