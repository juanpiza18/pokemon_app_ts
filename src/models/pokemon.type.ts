export interface Pokedex {
    pokemons: Pokemon[];
}

export interface PokemonsAPI {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResponseAPI[];
}

export interface PokemonResponseAPI {
    name: string;
    url: string;
}

export interface Pokemon {
    id: number;
    name: string;
    order: number;
    weight: number;
    height: number;
    sprites: Sprites;
    moves: Moves[];
    stats: Stats[];
    types: Types[];
    base_experience: number;
}

export interface Sprites {
    "back_default": Image;
    "back_female":Image;
    "back_shiny": Image;
    "back_shiny_female": Image;
    "front_default": Image;
    "front_female": Image;
    "front_shiny": Image;
    "front_shiny_female": Image;
    other: OtherImage;
}

interface OtherImage {
    "dream_world": {
        "front_default": Image;
        "front_female": Image;
    } | null;
    "home": {
        "front_default": Image;
        "front_female": Image;
        "front_shiny": Image;
        "front_shiny_female": Image;
    } | null;
    "official-artwork": {
        "front_default": Image;
        "front_shiny": Image;
    } | null;
}

export type Image = string | null;

export interface Moves {
    move: Move;
}

interface Move {
    name: string;
    url: string;
}

export interface Stats {
    "base_stat": number;
    effort: number;
    stat: Stat;
}

interface Stat {
    name: string;
    url: string;
}

export interface Types {
    slot: number;
    type: PokemonType;
}

interface PokemonType {
    name: string;
    url: string;
}


