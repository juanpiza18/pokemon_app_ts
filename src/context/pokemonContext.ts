import React from "react";
import { Pokemon } from "../models/pokemon.type";

export interface PokemonContextDefinitions {
    dataList: Pokemon[],
    filteredList: Pokemon[],
    offset: number,
    loading: boolean,
    paginationNext: () => void,
    paginationPrev: () => void,
    filterAllList: (filter:string) => Promise<void>,
    fetchData: () => void,
    fetchPokemonData: (id: number) => Promise<void>,
    setIndividualPokemonLoading: () => void;
    pokemon?: Pokemon,
    pokemonLoading: boolean,
}

const Context:PokemonContextDefinitions = {
    dataList:[],
    filteredList: [],
    offset: 0,
    loading: false,
    paginationNext: () => {},
    paginationPrev: () => {},
    filterAllList: async () => {},
    fetchData: () => {},
    fetchPokemonData: async () => {},
    setIndividualPokemonLoading: () => {},
    pokemon: undefined,
    pokemonLoading: false,
}

const PokemonContext = React.createContext<PokemonContextDefinitions>(Context);

export default PokemonContext;