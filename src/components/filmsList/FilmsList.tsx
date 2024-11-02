/** FilmsList Component. A React component that displays a list of Star Wars films, fetched from an external API. */

// Import necessary modules
import React, {Component} from "react";
import { Link } from "react-router-dom";

// Import additional services, styles and interfaces
import "./filmsList.css";
import { StateFilm } from "../../interfaces/interfaces";
import { StarWarsService } from "../../services/starWarsService";

class FilmsList extends Component<{}, StateFilm> {
    constructor(props: {}) {
        super(props);
        // Initialize state with default values
        this.state = {
            films: [],
            loading: false,
            error: null
        };
    }

    // Fetches all films from the Star Wars API and updates the state.
    loadFilmsAll = async () => {
        try {
            this.setState({ loading: true });
            
            const allData = await StarWarsService("https://sw-api.starnavi.io/films/");

            this.setState({
                loading: false,
                films: allData.results
            });
        } catch (error) {
            this.setState({error: "Failed to load films.", loading: false})
        }
    }

    // Lifecycle method to load films on component mount.
    componentDidMount(): void {
        this.loadFilmsAll();
    }
    
    render(): React.ReactNode {
        const {films, loading, error} = this.state;

        return (
            <div className="films">
                <div className="filmsNavigate">
                    <Link to="/">Home</Link>
                    <p>/ Films</p>
                </div>
    
                <div className="filmsCards">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="errorMessage">{error}</p>
                    ) : (
                        films.map((film) => (
                            <div key={film.id} className="filmCard">
                                <Link to={`/film/${film.id}`}>
                                    <img 
                                        src={`https://starwars-visualguide.com/assets/img/films/${film.id}.jpg`} 
                                        alt={film.title}
                                        onError={(e) => {
                                            e.currentTarget.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
                                        }} 
                                    />
                                    <h3>{film.title}</h3>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
}

export default FilmsList;