import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.page';
import PokemonPage from './pages/pokemon.page';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="pokemon/:id" element={<PokemonPage/>} />
      </Routes>
    </div>
  );
}

export default App;
