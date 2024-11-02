/** Service functions for fetching all Star Wars starships and films from API. */

import { StarWarsService } from "./starWarsService";

// Fetches all starships from the API, returning an ID-to-name map
export const getAllStarships = async (): Promise<Record<number, string>> => {
    let url = "https://sw-api.starnavi.io/starships/";
    const starshipsMap: Record<number, string> = {};

    while (url) {
        try {
            const data = await StarWarsService(url);

            data.results.forEach((starship: any) => {
                starshipsMap[starship.id] = starship.name;
            });

            url = data.next;
        } catch (error) {
            console.error("Failed to fetch starships:", error);
            break;
        }
    }

    return starshipsMap; // Return the completed starships map
};

// Fetches all films from the API, returning an ID-to-title map
export const getAllFilms = async (): Promise<Record<number, string>> => {
    try {
        const data = await StarWarsService("https://sw-api.starnavi.io/films/");

        const filmMap = data.results.reduce((acc: Record<number, string>, film: any) => {
            acc[film.id] = film.title;
            return acc;
        }, {});

        return filmMap;
    } catch (error) {
        console.error("Failed to fetch films:", error);
        return {};
    }
};