import React, {useContext} from 'react';
import {PokemonContext} from '../../context/PokemonContext';
import {useParams, Link} from 'react-router-dom';

const PokemonDetails = () => {
  const {getPokemonByID} = useContext(PokemonContext);
  const {id} = useParams();
  const pokemon = getPokemonByID(id).data;
  return !pokemon ? 'Pokemon not found' : <div className="PokemonDetails">
    <section>
      <nav><Link to="/">Go Back</Link></nav>
      <h2> PokemonDetails</h2>
    </section>
    <div>
        <img
          src={pokemon.sprites.other.home.front_default}
          alt=""
        />
     </div>
     <div className='right'> 
          <h1 className="font-semibold text-4xl w-full">
            #{pokemon.id}.{pokemon.name}
          </h1>
          <p>
            <span>Species: </span>
            <span>{pokemon.species.name}</span>
          </p>
          <p>{pokemon.description}</p>
          <p>
            <span>Height: </span>
            <span>{pokemon.height}</span>
          </p>
          <p>
            <span>Weight: </span>
            <span>{pokemon.weight}</span>
          </p>
          <div>
            {pokemon.types.map((eachType, typeIndex) => {
              return (
                <span
                  key={typeIndex}
                >
                  {eachType.type.name}
                </span>
              );
            })}
        </div>
      </div>   
      </div>
};

export default PokemonDetails;