import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import {PokemonProvider} from './context/PokemonContext';
import {BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PokemonProvider><BrowserRouter><App /></BrowserRouter></PokemonProvider>
);

