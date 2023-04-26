/*
 * Utility functions for creating mock objects and arrays for the testing
 */

import { Pokemon } from "../models/pokemon.type";

export const createPokemonsMockPayload = (elements: number, indexStart = 1) => {
    const pokemonsMock: Pokemon[] = [];
    const numberOfElements =
      indexStart >= elements ? indexStart + elements : elements;
    for (let index = indexStart; index <= numberOfElements; index++) {
      const dummy_pokemon = {
        id: index,
        name: `pokemon${index}`,
        base_experience: 120,
        height: 120,
        moves: [{ move: { name: "attack", url: "url" } }],
        order: 1,
        sprites: {
          back_default: null,
          other: {
            "official-artwork": null,
            dream_world: null,
            home: null,
          },
          back_female: null,
          back_shiny: null,
          back_shiny_female: null,
          front_default: null,
          front_female: null,
          front_shiny: null,
          front_shiny_female: null,
        },
        stats: [{ base_stat: 1, effort: 1, stat: { name: "hp", url: "url" } }],
        weight: 120,
        types: [{ slot: 1, type: { name: "water", url: "url" } }],
      };
      pokemonsMock.push(dummy_pokemon);
    }
    return pokemonsMock;
  };
  
  export const createPokemonsNameAndUrlMockPayload = (elements: number) => {
    const mockResponse = {
      results: [] as { name: string; url: string }[],
    };
    for (let index = 1; index <= elements; index++) {
      const pokemon = {
        name: `pokemon${index}`,
        url: `https://pokeapi.co/api/v2/pokemon/${index}/`,
      };
      mockResponse.results.push(pokemon);
    }
    return mockResponse;
  };