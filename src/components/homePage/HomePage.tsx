/** HomePage Component. Main page with navigation cards linking to different sections.
  - Characters
  - Films
  - Starships
*/

import { Link } from "react-router-dom";

import "./homePage.css";

const HomePage = () => {
    return (
        <div className="home">
            <div className="card">
                <Link to="/characters">
                    <img src={require("../../resources/images/characters.jpg")} alt="Characters" />
                </Link>
            </div>
            <div className="card">
                <Link to="/films">
                    <img src={require("../../resources/images/films.jpg")} alt="Films" />
                </Link>
            </div>
            <div className="card">
                <Link to="/starships">
                    <img src={require("../../resources/images/starships.jpg")} alt="Starships" />
                </Link>
            </div>
        </div>
    );
};

export default HomePage