import { render, screen } from "@testing-library/react";
import PokemonType, {PokemonTypeProps} from "./pokemonType.component";
import { MemoryRouter } from "react-router-dom";


describe("PokemonCard", () => {
  const props:PokemonTypeProps = {
    nameType: "grass",
    dataTestId: "pokemon-type"
  }; 

  it("renders the Pokemon Type with a specific type", () => {
    render(
        <MemoryRouter>
            <PokemonType {...props} />
        </MemoryRouter>);
    const type = screen.getByTestId("pokemon-type", {
        exact:false
    });
    expect(type).toHaveTextContent(props.nameType);
    expect(type.firstChild).toHaveClass('fa-leaf');
  });

  it("renders the pokemon type with a non found type", () => {
    const newProps:PokemonTypeProps = {
        nameType: "notFound",
        dataTestId: "pokemon-type"
    }
    render(
        <MemoryRouter>
            <PokemonType {...newProps} />
        </MemoryRouter>);
    const type = screen.getByTestId("pokemon-type", {
        exact:false
    });
    expect(type).toHaveTextContent(newProps.nameType);
    expect(type.firstChild).toHaveClass('fa-paw');
  });


});