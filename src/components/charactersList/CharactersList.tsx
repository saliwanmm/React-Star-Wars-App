/** CharactersList Component. Displays a paginated list of Star Wars characters. */

// Import necessary modules
import React, {Component} from "react";
import { Link } from "react-router-dom";

// Import additional services, styles and interfaces
import "./charactersList.css";
import { State } from "../../interfaces/interfaces";
import { StarWarsService } from "../../services/starWarsService";

class CharactersList extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        // Initialize state with default values
        this.state = {
            characters: [],
            curPage: 1,
            charactersOnPage: 10,
            totalCharacters: 0,
            totalPages: 0,
            loading: false,
            error: null
        };
    }

    // A function that updates the state using data received through the API
    loadCharactersAll = async (page: number) => {
        try {
            this.setState({ loading: true });

            const data = await StarWarsService(`https://sw-api.starnavi.io/people/?page=${page}`); // A service that sends a request and receives data from the server

            const totalPages = Math.ceil(data.count / this.state.charactersOnPage);

            // Update the state based on the received data
            this.setState({
                characters: data.results,
                totalCharacters: data.count,
                totalPages: totalPages,
                curPage: page,
                loading: false
            });
        } catch (error) {
            // Handle errors and stop loading on failure
            this.setState({ error: "Failed to load characters.", loading: false})
        }
    };

    // Initial data load on component mount
    componentDidMount(): void {
        this.loadCharactersAll(1);
    }

    // Function responsible for pagination
    paginate = (pageNum: number) => {
        if (pageNum !== this.state.curPage) {
            this.loadCharactersAll(pageNum);
        }
    };

    // Renders pagination buttons function
    renderPaginationButtons = () => {
        const { curPage, totalPages } = this.state;

        return (
            <>
                <button 
                    className="paginateBtn left"
                    onClick={() => {this.paginate(curPage - 1)}}
                    disabled={curPage === 1}
                    >{'<'}
                </button>

                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;

                    if (
                        page === 1 || 
                        page === totalPages ||
                        (page >= curPage - 2 && page <= curPage + 2)
                    ) {
                        return (
                            <button
                                key={page}
                                className={`paginateBtn ${curPage === page ? "active" : ""}`}
                                onClick={() => this.paginate(page)}>
                                {page}
                            </button>
                        )
                    } else if (
                        page  === curPage - 3 || page === curPage + 3
                    ) {
                        return <span key={page} className="paginateDots">...</span>;
                    }

                    return null;
                })}

                <button 
                    className="paginateBtn right"
                    onClick={() => {this.paginate(curPage + 1)}}
                    disabled={curPage === totalPages}
                    >{'>'}
                </button>
            </>
        )
    };


    render(): React.ReactNode {
        const { characters, loading, error } = this.state;

        return (
            <div className="characters">
                {/* Navigation */}
                <div className="charactersNavigate">
                    <div className="charactersNavigatePath">
                        <Link to="/">Home</Link>
                        <p>/ Characters</p>
                    </div>

                    <div className="charactersNavigatePaginate">
                        {this.renderPaginationButtons()}
                    </div>
                </div>

                {/* Rendering characters cards */}
                <div className="characterCards">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="errorMessage">{error}</p>
                    ) : (
                        characters.map((character) => (
                            <div key={character.id} className="characterCard">
                                <Link to={`/character/${character.id}`}>
                                    <img 
                                        src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`} 
                                        alt={character.name}
                                        onError={(e) => {
                                            e.currentTarget.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
                                        }} 
                                    />
                                    <h3>{character.name}</h3>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
}

export default CharactersList;