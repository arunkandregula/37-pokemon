import React from 'react';
import PokemonList from '../PokemonList/PokemonList';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import {Routes, Route} from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element = {<PokemonDetails />} /> 
    </Routes>
    </div>
  );
}

export default App;
