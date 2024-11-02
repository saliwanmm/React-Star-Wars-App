/** CharacterDetails Component. Displays detailed information about a specific Star Wars character with a visual graph representation. */

// Import necessary modules
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactFlow, { Background, Controls } from "react-flow-renderer";

// Import additional services, styles and interfaces
import "./charactersDetails.css";
import { StateForCharacters, ItemsDetailsProps } from "../../interfaces/interfaces";
import { getAllStarships, getAllFilms } from "../../services/charactersDetailService";
import { withRouter } from "../../services/withRouter";
import { getNodesAndEdges } from "../../services/nodesAndEdges";


class CharacterDetails extends Component<ItemsDetailsProps, StateForCharacters> {
    constructor(props: ItemsDetailsProps) {
        super(props);
        // Initialize state with default values
        this.state = {
            characters: [],
            curPage: 0,
            charactersOnPage: 10,
            totalCharacters: 0,
            totalPages: 0,
            allFilms: {},
            allStarships: {},
            loading: true,
            error: null,
            character: null,
            nodes: [],
            edges: []
        };
    }

    // Fetches all films and starships, then loads character details based on the ID
    async componentDidMount() {
        try {
            // Get all films and starships for building relationships
            const allFilms = await getAllFilms();
            const allStarships = await getAllStarships();
             
            this.setState({ allFilms, allStarships });
            
            // Retrieve character details and graph data using character ID from route params
            const { id } = this.props.params;
            if (id && Object.keys(allFilms).length && Object.keys(allStarships).length) {
                const { character, nodes, edges } = await getNodesAndEdges(id, allFilms, allStarships);
                
                // Update state using fetched data
                this.setState({
                    character,
                    nodes,
                    edges,
                    loading: false
                });
            }
        } catch (error) {
            // Handle errors and stop loading on failure
            this.setState({ error: "Failed to load character data", loading: false });
        }
    }

    // Renders the component UI with a character details, and React Flow visualization
    render(): React.ReactNode {
        const { character, nodes, edges, loading, error } = this.state;

        if (loading) return <p>Loading...</p>;
        if (error) return <p className="error-message">{error}</p>;

        return (
            <div className="characterDetails">
                {/* Navigation */}
                <div className="charactersDetailsNavigate">
                    <div className="charactersDetailsNavigatePath">
                        <Link to="/">Home</Link>
                        <p>/</p>
                        <Link to="/characters">Characters</Link>
                        <p>/</p>
                        <p>{character?.name}</p>
                    </div>
                </div>

                {/* Character detail section with graph visualization */}
                <div className="charactersDetailsNode">
                    <h1>{character?.name} - Details</h1>

                    {/* React Flow for character's connections */}
                    <ReactFlow nodes={nodes} edges={edges} style={{ width: '100%', height: '500px' }}>
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
            </div>
        )
    }  
}

export default withRouter(CharacterDetails);