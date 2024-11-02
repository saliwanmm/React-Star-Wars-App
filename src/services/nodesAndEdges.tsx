/** Generates nodes and edges for character details using React Flow. */

import { Character } from "../interfaces/interfaces";
import { Node, Edge } from "react-flow-renderer";
import { GetItemById } from "./starWarsService";

// Fetches character details and creates graph nodes and edges for visualization
export const getNodesAndEdges = async (
    id: string,
    allFilms: Record<number, string>,
    allStarships: Record<number, string>
): Promise<{ character: Character | null; nodes: Node[]; edges: Edge[] }> => {
    try {
        // Fetch character data by ID
        const data = await GetItemById(`https://sw-api.starnavi.io/people/${id}/`);

        // Character node
        const characterNode: Node = { id: 'character', data: { label: data.name }, position: { x: 250, y: 50 } };

        // Film nodes and edges
        const filmNodes: Node[] = (data.films || []).map((filmId: number, index: number) => ({
            id: `film-${filmId}`,
            data: { label: allFilms[filmId] || `Film ${filmId}` },
            position: { x: 150 * (index + 1), y: 150 }
        }));

        const starshipNodes: Node[] = (data.starships || []).map((starshipId: number, index: number) => ({
            id: `starship-${starshipId}`,
            data: { label: allStarships[starshipId] || `Starship ${starshipId}` },
            position: { x: 150 * (index + 1), y: 300 }
        }));
        
        const filmEdges: Edge[] = (data.films || []).map((filmId: number) => ({
            id: `character-film-${filmId}`,
            source: 'character',
            target: `film-${filmId}`,
            type: 'smoothstep'
        }));

        // Connect starships to the first film if films exist
        const starshipEdges: Edge[] = (data.films && data.films.length > 0)
            ? (data.starships || []).map((starshipId: number) => ({
                id: `film-starship-${starshipId}`,
                source: `film-${data.films[0]}`,
                target: `starship-${starshipId}`,
                type: 'smoothstep'
            }))
            : [];

        return {
            character: data,
            nodes: [characterNode, ...filmNodes, ...starshipNodes],
            edges: [...filmEdges, ...starshipEdges]
        };
    } catch (error) {
        console.error("Failed to load character data:", error);
        throw new Error("Failed to load character data");
    }
};