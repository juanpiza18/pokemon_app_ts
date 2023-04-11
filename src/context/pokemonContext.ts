import React from "react";
import { Pokemon } from "../models/pokemon.type";

interface PokemonContextDefinitions {
    dataList: Pokemon[],
    filteredList: Pokemon[],
    offset: number,
    loading: boolean,
    paginationNext: () => void,
    paginationPrev: () => void,
    filterAllList: (filter:string) => Promise<void>,
    fetchData: () => void,
    fetchPokemonData: (id: string) => Promise<void>,
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
    pokemon: undefined,
    pokemonLoading: false,
}

const PokemonContext = React.createContext<PokemonContextDefinitions>(Context);

export default PokemonContext;