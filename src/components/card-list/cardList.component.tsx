import React from "react";
import PokemonCard from "../card/pokemonCard.component";
import WithSpinner from "../../hoc/withSpinner.hoc";
import { Pokemon } from "../../models/pokemon.type";

export interface PokemonListProps {
  list: Pokemon[];
}

const PokemonList = ({ list }: PokemonListProps) => {
  return (
    <>
      {list.length > 0 ? (
        list.map((pokemon) => {
          const image =
            pokemon.sprites.other.dream_world?.front_default ??
            pokemon.sprites.front_default;
          return (
            <PokemonCard
              key={pokemon.id}
              imageUrl={image ?? ""}
              pokemonName={pokemon.name}
              pokemonNumber={pokemon.id}
              pokemonType={pokemon.types}
            />
          );
        })
      ) : (
        <span> No pokemons found </span>
      )}
    </>
  );
};

export default React.memo(WithSpinner(PokemonList));
