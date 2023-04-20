import { render, screen } from "@testing-library/react";
import PokemonCard, {PokemonCardProps} from "./pokemonCard.component";
import { MemoryRouter } from "react-router-dom";


describe("PokemonCard", () => {
  const props: PokemonCardProps = {
    imageUrl: "https://example.com/image.png",
    pokemonName: "Bulbasaur",
    pokemonNumber: 1,
    pokemonType: [{ slot: 1 , type: {name: "grass", url: "url"}}],
  };

  beforeEach(() => {
     render(
        <MemoryRouter>
            <PokemonCard {...props} />
        </MemoryRouter>);
  });

  it("renders the Pokemon image", () => {
    const image = screen.getByAltText(`Pokemon ${props.pokemonName}`);
    expect(image).toBeInTheDocument();
  });

  it("renders the Pokemon name and number", () => {
    const name = screen.getByText(props.pokemonName);
    const number = screen.getByText(`#${props.pokemonNumber}`);
    expect(name).toBeInTheDocument();
    expect(number).toBeInTheDocument();
  });

  it("renders pokemon type", () => {
    const types = screen.getAllByTestId("pokemon-type", {
        exact:false
    });
    expect(types).toHaveLength(props.pokemonType.length);
    props.pokemonType.forEach(({ type }, index) => {
        expect(types[index]).toHaveTextContent(type.name);
    });
  });

  it('should render a link to the pokemon page', () => {
    const pokemonLink = screen.getByRole('link', { name: /pokemon/i });
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink.getAttribute('href')).toBe('/pokemon/1');
  });

});