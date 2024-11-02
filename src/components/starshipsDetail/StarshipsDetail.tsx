/** StarshipsDetails Component. Displays detailed information about a selected Star Wars starship. */

// Import necessary modules
import React, {Component} from "react";
import { Link } from "react-router-dom";

// Import additional services, styles and interfaces
import "./StarshipsDetail.css";
import { StateForStarships, ItemsDetailsProps } from "../../interfaces/interfaces";
import { withRouter } from "../../services/withRouter";
import { GetItemById } from "../../services/starWarsService";

class StarshipsDetails extends Component<ItemsDetailsProps, StateForStarships> {
    constructor(props: ItemsDetailsProps) {
        super(props);
        // Initialize state with default values
        this.state = {
            starship: null,
            loading: false,
            error: null
        };
    }

    // Fetches a specific starship's data by ID and updates the state with the retrieved information.
    getStarshipById = async (id: string) => {
        this.setState({loading: true});

        try {
            const data = await GetItemById(`https://sw-api.starnavi.io/starships/${id}/`);
            
            this.setState({starship: data, loading: false})
        } catch (error) {
            this.setState({error: "Failed to fetch starship", loading: false});
        }
    }

    // Lifecycle method that fetches starship details once the component is mounted.
    componentDidMount(): void {
        this.getStarshipById(this.props.params.id);
    }

    render(): React.ReactNode {
        const { starship, loading, error } = this.state;

        return (
            <div className="starshipDetails">
                <div className="starshipDetailsNavigate">
                    <div className="starshipDetailsNavigatePath">
                        <Link to="/">Home</Link>
                        <p>/</p>
                        <Link to="/starships">Starships</Link>
                        <p>/</p>
                        <p>{starship?.name}</p>
                    </div>
                </div>

                { loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="errorMessage">{error}</p>
                ) : (
                    <div className="starshipDetailsContent">
                        <div className="starshipImageContainer">
                            <img 
                                src={`https://starwars-visualguide.com/assets/img/starships/${starship?.id}.jpg`} 
                                alt={starship?.name} 
                                className="starshipImage" 
                            />
                        </div>
                        
                        <div className="starshipInfo">
                            <h1>{starship?.name}</h1>
                            <p><strong>Model:</strong> {starship?.model}</p>
                            <p><strong>Manufacturer:</strong> {starship?.manufacturer}</p>
                            <p><strong>Class:</strong> {starship?.starship_class}</p>
                            <p><strong>Cost:</strong> {starship?.cost_in_credits} credits</p>
                            <p><strong>Speed:</strong> {starship?.max_atmosphering_speed} km/h</p>
                            <p><strong>Hyperdrive Rating:</strong> {starship?.hyperdrive_rating}</p>
                            <p><strong>MGLT:</strong> {starship?.MGLT}</p>
                            <p><strong>Length:</strong> {starship?.length}m</p>
                            <p><strong>Cargo Capacity:</strong> {starship?.cargo_capacity}kg</p>
                            <p><strong>Minimum Crew:</strong> {starship?.crew}</p>
                            <p><strong>Passengers:</strong> {starship?.passengers}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(StarshipsDetails);