import { Pokemon } from "../models/pokemon.type";
import * as API from "./pokemonApi";
import { createPokemonsMockPayload, createPokemonsNameAndUrlMockPayload } from "./testUtils";

describe("Pokemon API", () => {

    it("returns a Pokemon object with the expected properties", async () => {
         const mockPokemonData: Pokemon[] = createPokemonsMockPayload(1);
        const mockResponseJson = jest.fn().mockResolvedValue(mockPokemonData[0]);
        const mockFetch = jest.fn().mockResolvedValue({ json: mockResponseJson });
        global.fetch = mockFetch as any;
        const {id, name, } = await API.getPokemonById(1);
        expect(name).toBe('pokemon1');
        expect(id).toBe(1);
    });

    it('returns all the list of pokemons', async () => {
        const mockResponse = createPokemonsNameAndUrlMockPayload(3);
        const mockPokemonData: Pokemon[] = createPokemonsMockPayload(3);
        const mockResponseJson = jest.fn().mockResolvedValue(mockResponse);
        const mockFetch = jest.fn().mockResolvedValue({ json: mockResponseJson });
        global.fetch = mockFetch as any;
        const pokemons = await API.getAllPokemons();
        expect (pokemons.length).toBe(mockPokemonData.length);
     });

     it('returns offset list of pokemons', async () => {
      const mockResponse = createPokemonsNameAndUrlMockPayload(3);
      const mockPokemonData: Pokemon[] = createPokemonsMockPayload(3);
      const mockResponseJson = jest.fn().mockResolvedValue(mockResponse);
      const mockFetch = jest.fn().mockResolvedValue({ json: mockResponseJson });
      global.fetch = mockFetch as any;
      const pokemons = await API.getPokemonListByOffset(0);
      expect (pokemons.length).toBe(mockPokemonData.length);
   });
});