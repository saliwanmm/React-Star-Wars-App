// Import React Router module
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all components
import AppHeader from '../appHeader/AppHeader'; // Header 
import HomePage from '../homePage/HomePage'; // Home page
import CharactersList from '../charactersList/CharactersList'; // Characters list page
import CharacterDetails from '../charactersDetails/CharactersDetails'; // Characters details page
import FilmsList from '../filmsList/FilmsList'; // Films list page
import FilmsDetails from '../filmsDetails/filmsDetail'; // Films details page
import StarshipsList from '../starshipsList/StarshipsList'; // Starships list page
import StarshipsDetail from '../starshipsDetail/StarshipsDetail'; // Starships details page
import AppFooter from '../appFooter/AppFooter'; // Footer

import './App.css'; // App styles

function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader/>
        <div className="main-content">
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/characters' element={<CharactersList/>}/>
            <Route path='/character/:id' element={<CharacterDetails/>}/>
            <Route path='/films' element={<FilmsList/>}/>
            <Route path='/film/:id' element={<FilmsDetails/>}/>
            <Route path='/starships' element={<StarshipsList/>}/>
            <Route path='/starship/:id' element={<StarshipsDetail/>}/>
          </Routes>
        </div>
        <AppFooter/>
      </div>
    </Router>
  );
}

export default App;
