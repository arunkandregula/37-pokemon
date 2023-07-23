
export const loadPokemons = (url) => fetch(url).then(response => response.json());
export const loadPokemon = (eachPokemonUrl) => fetch(eachPokemonUrl).then(response => response.json());
