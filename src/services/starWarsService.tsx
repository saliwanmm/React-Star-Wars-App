/** StarWarsService Module. Provides helper functions for fetching data from the Star Wars API. */

export const StarWarsService = async (path: string) => {
    const response = await fetch(path);
    const data = await response.json();

    return {
        results: data.results,
        count: data.count,
        next: data.next,
        previous: data.previous
    }
}

export const GetItemById = async (path: string) => {
    const response = await fetch(path);
    const data = await response.json();

    return data
}