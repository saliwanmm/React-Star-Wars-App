import { Node, Edge } from "react-flow-renderer";

// Character interface
export interface Character {
    id: number;
    name: string;
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: number;
    films: number[];
    species: number[];
    vehicles: number[];
    starships: number[];
    created: string;
    edited: string;
    url: string;
}

// Film interface
export interface Films {
    id: number;
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: number[];
    planets: number[];
    starships: number[];
    vehicles: number[];
    species: number[];
    created: string;
    edited: string;
    url: string;
}

// Starship interface
export interface Starship {
    id: number;
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: number[];
    MGLT: string;
    starship_class: string;
    pilots: [];
    films: number[];
    created: string;
    edited: string;
    url: string;
}

export interface StateFilm {
    films: Films[];
    loading: boolean;
    error: string | null;
}

export interface stateCharacer {
    character: Character | null;
    loading: boolean;
    error: string | null
}

export interface StateStarships {
    starships: Starship[];
    starshipsOnPage: number,
    totalStarships: number,
    curPage: number,
    totalPages: number,
    loading: boolean;
    error: string | null;
}

export interface State {
    characters: Character[],
    curPage: number,
    charactersOnPage: number,
    totalCharacters: number,
    totalPages: number,
    loading: boolean,
    error: string | null
}

// State for character interface
export interface StateForCharacters {
    characters: Character[];
    curPage: number;
    charactersOnPage: number;
    totalCharacters: number;
    totalPages: number;
    allFilms: Record<number, string>;
    allStarships: Record<number, string>;
    loading: boolean;
    error: string | null;
    character: Character | null;
    nodes: Node[]; 
    edges: Edge[];
}

// State for film interface
export interface StateForFilms {
    film: Films | null;
    loading: boolean;
    error: string | null;
}

// State for starship interface
export interface StateForStarships {
    starship: Starship | null;
    loading: boolean;
    error: string | null;
}

// Props interface
export interface ItemsDetailsProps {
    params: {
        id: string;
    }
}