import React, {useState} from 'react';
let PokemonContext = null;
export const PAGE_SIZE = 8;
const {Provider, Consumer} = PokemonContext = React.createContext(null);

const PokemonProvider = (props) => {
  const [pokemonsByID, setPokemonsByID] = useState(Object.create(null));
  const [totalAvailableCount, setTotalAvailableCount] = useState(0);

  const cachePokemons = (pokemonDB) => {
    setPokemonsByID(map => {
      const newMap = pokemonDB.reduce((accumulator, eachPokemon, index)=>{
        accumulator[eachPokemon.data.id] = eachPokemon;
        return accumulator;
      }, map );
      return {
        ...newMap
      };

    });
    console.log('pokemonsByID:', pokemonsByID);
  }

  const getPokemonByID = (id) => {
    return pokemonsByID[id];
  }


  return <Provider value={{
    totalAvailableCount, 
    setTotalAvailableCount,
    cachePokemons,
    getPokemonByID,
  }}>
    {props.children}
  </Provider>;
}

export {PokemonProvider, Consumer as PokemonConsumer, PokemonContext};
