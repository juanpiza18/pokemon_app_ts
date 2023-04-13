import React, { useState, useCallback, useRef, FC } from "react";
import PokemonContext from "./pokemonContext";
import {
  getAllPokemons,
  getPokemonListByOffset,
  getPokemonById,
} from "../utils/pokemonApi";
import { defaultPokemonsSize } from "../utils/constants";
import Fuse from "fuse.js";
import { Pokemon } from "../models/pokemon.type";

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: false,
  // includeMatches: false,
  findAllMatches: true,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["name"],
};

export const PokemonProvider:FC = ({ children }: React.PropsWithChildren) => {
  let fuseRef = useRef< any | Fuse<Pokemon> >(null);
  const [pokemonsList, setPokemonList] = useState<Pokemon[]>([]);
  const [allPokemonsFilter, setAllPokemonsFilter] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonLoading, setpokemonLoading] = useState<boolean>(true);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);

  const fetchPokemonsOffset = useCallback(async () => {
    setLoading(true);
    const data = await getPokemonListByOffset(offset);
    setPokemonList(data);
    setLoading(false);
  }, [offset, setPokemonList, setLoading]);

  const fetchPokemonData = useCallback(
    async (id: number) => {
      setpokemonLoading(true);
      const data = await getPokemonById(id);
      setPokemon(data);
      setpokemonLoading(false);
    },
    [setPokemon, setpokemonLoading]
  );

  const filterAllPokemonsList = useCallback(
    async (filter: string) => {
      setLoading(true);
      const data =
        allPokemons.length > 0 ? allPokemons : await getAllPokemons();
      if (allPokemons.length === 0) {
        setAllPokemons(data);
        fuseRef.current = new Fuse(data, options);
      }
      const filterData = fuseRef.current
        ?.search(filter)
        .map((data: any) => data.item);
      setAllPokemonsFilter(filterData);
      setLoading(false);
    },
    [allPokemons, setAllPokemonsFilter, setLoading]
  );

  const paginationNext = () => {
    setOffset((prev) => {
      if (prev === defaultPokemonsSize) {
        return 1261;
      }
      return prev + 21;
    });
  };

  const paginationPrev = () => {
    setOffset((prev) => {
      if (prev > 0) {
        return prev - 21;
      }
      return 0;
    });
  };

  const setIndividualPokemonLoading = () => {
    setpokemonLoading((prev) => !prev );
  }; 

  return (
    <PokemonContext.Provider
      value={{
        dataList: pokemonsList,
        filteredList: allPokemonsFilter,
        offset,
        loading,
        paginationNext,
        paginationPrev,
        filterAllList: filterAllPokemonsList,
        fetchData: fetchPokemonsOffset,
        fetchPokemonData,
        pokemon,
        pokemonLoading,
        setIndividualPokemonLoading: setIndividualPokemonLoading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
