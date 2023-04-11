import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/header.component";
import PokemonStats from "../components/pokemon-stats/pokemonStats.component";
import PokemonMoves from "../components/pokemon-moves/pokemonMoves.component";
import PokemonProfile from "../components/pokemon-profile/pokemonProfile.component";
import PokemonContext from "../context/pokemonContext";
import { Image } from "../models/pokemon.type";
import IsLoading from "../components/isLoading/loading.component";

const PokemonPage = () => {
  let image:Image = '';
  const { fetchPokemonData, pokemon, pokemonLoading } =
    useContext(PokemonContext);
  const { id } = useParams();

  useEffect(() => {
    const number = id ?? '1';
    const pokemonId = Number(number);
    if(!isNaN(pokemonId)){
      fetchPokemonData(pokemonId);
    }
  }, [fetchPokemonData, id]);


  if (pokemon?.sprites) {
    image =
      pokemon.sprites.other.dream_world?.front_default ??
      pokemon.sprites.front_default;
  }

  return (
    <>
      <Header />
      <div className="pokemonpage__container">
       <IsLoading isLoading={pokemonLoading}>
          {pokemon && <><PokemonProfile pokemon={pokemon} image={image} />
          <div>
            <PokemonStats stats={pokemon.stats} />
            <PokemonMoves moves={pokemon.moves} />
          </div> 
          </>}
        </IsLoading> 
      </div>
    </>
  );
};

export default PokemonPage;
