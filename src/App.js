import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Pokemons from './Components/Pokemons';

import './App.css'
import Nav from './Components/Nav';
import SinglePoke from './Components/SinglePoke';
import Favourites from './Components/Favourites';

function App() {
  
  return (
    <>
    <Router>
      <Nav />
    <div className="App">
      <Routes>
    <Route element={<Pokemons/>} exact path='/'>
    </Route>
    <Route element={<SinglePoke/>} path='/:id/:name'>
    </Route>
    <Route element={<Favourites/>} exact path='/favourites'>
    </Route>
    </Routes>
    </div>
    </Router>
    <div id='footer-container'><div id="footer">All rights reserved</div></div>
    </>
  );
}

export default App;
