/** FilmsDetails Component. A React component that displays detailed information about a specific Star Wars film. */

// Import necessary modules
import React, {Component} from "react";
import { Link } from "react-router-dom";

// Import additional services, styles and interfaces
import "./filmsDetail.css";
import { StateForFilms, ItemsDetailsProps } from "../../interfaces/interfaces";
import { withRouter } from "../../services/withRouter";
import { GetItemById } from "../../services/starWarsService";


class FilmsDetails extends Component<ItemsDetailsProps, StateForFilms> {
    constructor(props: ItemsDetailsProps) {
        super(props);
        // Initializing state with default values
        this.state = {
            film: null,
            loading: false,
            error: null
        };
    }

    // Fetches film data by ID from the API and updates state accordingly.
    getFilmById = async (id: string) => {
        this.setState({loading: true});

        try {
            const data = await GetItemById(`https://sw-api.starnavi.io/films/${id}/`);
            
            this.setState({film: data, loading: false})
        } catch (error) {
            this.setState({error: "Failed to fetch films", loading: false});
        }
    }

    // Lifecycle method to load film details based on the route parameter ID.
    componentDidMount(): void {
        this.getFilmById(this.props.params.id);
    }

    render(): React.ReactNode {
        const { film, loading, error } = this.state;

        return (
            <div className="filmDetails">
                <div className="filmDetailsNavigate">
                    <div className="filmDetailsNavigatePath">
                        <Link to="/">Home</Link>
                        <p>/</p>
                        <Link to="/films">Films</Link>
                        <p>/</p>
                        <p>{film?.title}</p>
                    </div>
                </div>

                { loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="errorMessage">{error}</p>
                ) : (
                    <div className="filmDetailsContent">
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/films/${film?.id}.jpg`} 
                            alt={film?.title} 
                            className="filmImage" 
                        />

                        <div className="filmInfo">
                            <h1>Episode {film?.episode_id}: {film?.title}</h1>
                            <p><strong>Date Created:</strong> {film?.release_date}</p>
                            <p><strong>Director:</strong> {film?.director}</p>
                            <p><strong>Producer(s):</strong> {film?.producer}</p>
                            <p><strong>Opening Crawl:</strong></p>
                            <p className="openingCrawl">{film?.opening_crawl}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(FilmsDetails);