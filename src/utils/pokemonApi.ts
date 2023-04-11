import { Pokemon, PokemonsAPI } from "../models/pokemon.type";
import { pokemonAPI } from "./constants";

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  const pokemonData:Pokemon = await (await fetch(`${pokemonAPI}pokemon/${id}`)).json();
  return pokemonData;
};

export const getPokemonListByOffset = async (offset: number) => {
  const request = await fetch(
    `${pokemonAPI}pokemon?limit=${21}&offset=${offset}`
  );
  const response: PokemonsAPI = await request.json();
  const data = response.results;
  const pokemonPromises: Promise<Pokemon>[] = data.map(async (pokemon) => {
    const pokemonData = await (await fetch(`${pokemon.url}`)).json();
    return pokemonData;
  });
  return await Promise.all([...pokemonPromises]);
};

export const getAllPokemons = async () => {
  const request = await fetch(`${pokemonAPI}pokemon?limit=100000&offset=0`);
  const response: PokemonsAPI = await request.json();
  const data = response.results;
  const pokemonPromises: Promise<Pokemon>[] = data.map(async (pokemon: any) => {
    const pokemonData = await (await fetch(`${pokemon.url}`)).json();
    return pokemonData;
  });
  return await Promise.all([...pokemonPromises]);
};
