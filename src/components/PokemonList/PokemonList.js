import React,{useEffect, useState, useContext} from 'react';
import {loadPokemons, loadPokemon} from '../../services/api';
import PokemonCard from '../PokemonCard/PokemonCard';
import {PokemonContext, PAGE_SIZE} from '../../context/PokemonContext';
import './PokemonList.css';

const BASE_URL_FOR_ALL_POKEMONS = `https://pokeapi.co/api/v2/pokemon?limit=1500`;
const SortOrder = Object.freeze({
  ASC: 0,
  DESC: 1,
}); 
const PokemonList = () => {
  const {cachePokemons, totalAvailableCount, setTotalAvailableCount} = useContext(PokemonContext);
  const [pokemonDB, setPokemonDB] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);


  const fetchPokemons = (newPokemonDB) => {
    let pokemonPromises = [];
    setIsLoading(true);
    const currentPagePokemons = newPokemonDB.slice(currentOffset, currentOffset + PAGE_SIZE);
    if(currentPagePokemons.length === 0 ){
      return;
    }
    pokemonPromises = currentPagePokemons.map(eachPokemonParent => loadPokemon(eachPokemonParent.url))
    Promise.all(pokemonPromises).then((values) => {
      const newPokemonData = newPokemonDB.slice(currentOffset, currentOffset + values.length).map((eachValue,i) => ({
        ...eachValue,
        data: values[i]
      }));
      setPokemonDB([
        ...newPokemonDB.slice(0, currentOffset),
        ...newPokemonData,
        ...newPokemonDB.slice(currentOffset + values.length-1)
      ]);
      setPokemons(newPokemonData);
      cachePokemons(newPokemonData);
      setIsLoading(false);
    }); 
  };

  useEffect(() => {
    if(pokemonDB.length === 0){
      return;
    }
    const pokemonForTheOffset = pokemonDB[currentOffset];
    if(pokemonForTheOffset == null || pokemonForTheOffset.data == null){
      fetchPokemons(pokemonDB);
    } else {
      setPokemons(pokemonDB.slice(currentOffset, currentOffset + PAGE_SIZE));
    }
  }, [currentOffset, sortOrder]);

  useEffect(() => {
      loadPokemons(BASE_URL_FOR_ALL_POKEMONS).then((allPokemons)=>{
        setTotalAvailableCount(allPokemons.count);
        // Step1. Sort all pokemons
        allPokemons.results.sort((p1, p2) => {
          if(p1.name < p2.name){
            return sortOrder === SortOrder.ASC ? -1 : 1;
          } else if(p1.name > p2.name){
            return sortOrder === SortOrder.ASC ? 1 : -1;
          } else {
            return 0;
          }
        });
        setPokemonDB(a => allPokemons.results);
        fetchPokemons(allPokemons.results);
      });
  }, []);

  const handleChangeSort = () => {
    setSortOrder((sortOrder === SortOrder.ASC) ? SortOrder.DESC : SortOrder.ASC);
    setPokemonDB(list => list.reverse());

  }
  return <div className="PokemonList">
       <h2>Pokemon Browser</h2>
       <div className="pageNum">
        <div> Page {currentOffset/PAGE_SIZE + 1} / {totalAvailableCount}</div>
        <div>
        <select value={sortOrder} onChange={handleChangeSort}>
          <option value={SortOrder.ASC} >Order by name - Ascending</option>
          <option value={SortOrder.DESC} >Order by name - Descending</option>
        </select> 
        </div>
       </div>
       <section>
        {currentOffset >= PAGE_SIZE ? <button onClick={() => setCurrentOffset(currentOffset - PAGE_SIZE)}>Previous</button> : null }
        {currentOffset < totalAvailableCount ? <button onClick={() => setCurrentOffset(currentOffset + PAGE_SIZE)}>Next</button> : null}
       </section>
    <main>
      {isLoading ? <div className="loading">Loading Pokemons...</div>: pokemons.map(eachPokemon => <PokemonCard key={eachPokemon.data.id} value={eachPokemon}/>)}  
    </main>
  </div>;
}

export default PokemonList;