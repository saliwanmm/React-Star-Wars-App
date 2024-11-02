/** StarshipsList Component. Displays a paginated list of Star Wars starships. Fetches data from the Star Wars API and presents it in a card layout. */

// Import necessary modules
import React, {Component} from "react";
import { Link } from "react-router-dom";

// Import additional services, styles and interfaces
import "./starshipsList.css";
import { StateStarships } from "../../interfaces/interfaces";
import { StarWarsService } from "../../services/starWarsService";

class StarshipsList extends Component<{}, StateStarships> {
    constructor(props: {}) {
        super(props);
        this.state = {
            starships: [],
            starshipsOnPage: 10,
            totalStarships: 0,
            curPage: 1,
            totalPages: 0,
            loading: false,
            error: null
        }
    }

    // Fetches starship data, updates the state with retrieved data, and calculates the total number of pages based on results.
    loadStarshipAll = async (page: number) => {
        try {
            this.setState({loading: true});

            const data = await StarWarsService(`https://sw-api.starnavi.io/starships/?page=${page}`);

            const totalPages = Math.ceil(data.count / this.state.starshipsOnPage);

            this.setState({
                starships: data.results,
                totalStarships: data.count,
                curPage: page,
                totalPages: totalPages,
                loading: false
            });
        } catch (error) {
            this.setState({error: "Failed to load starships.", loading: false})
        }
    }

    // Component lifecycle method that loads the first page of starships on mount.
    componentDidMount(): void {
        this.loadStarshipAll(1);
    }

    // Function responsible for pagination
    paginate = (pageNum: number) => {
        if (pageNum !== this.state.curPage) {
            this.loadStarshipAll(pageNum);
        }
    };

    // * Renders pagination buttons based on the current and total pages
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
        const { starships, loading, error } = this.state;

        return (
            <div className="starships">
                <div className="starshipsNavigate">
                    <div className="starshipsNavigatePath">
                        <Link to="/">Home</Link>
                        <p>/ Starships</p>
                    </div>

                    <div className="starshipsNavigatePaginate">
                        { this.renderPaginationButtons() }
                    </div>
                </div>
                
                <div className="starshipCards">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="errorMessage">{error}</p>
                    ) : (
                        starships.map((starship) => (
                            <div key={starship.id} className="starshipCard">
                                <Link to={`/starship/${starship.id}`}>
                                    <img 
                                        src={`https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`} 
                                        alt={starship.name}
                                        onError={(e) => {
                                            e.currentTarget.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
                                        }} 
                                    />
                                    <h3>{starship.name}</h3>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
}

export default StarshipsList;