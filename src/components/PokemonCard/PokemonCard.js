import React from 'react';
import {Link} from 'react-router-dom';

import './PokemonCard.css';

const PokemonCard = React.memo(({value}) => {
  const {data} = value;
  return <div className="PokemonCard">
    <Link to={`/pokemon/${data.id}`}><h4>{data.name}</h4></Link>
    <img src={data.sprites.other.home.front_default} /> 
    <ul>{data.types.map(eachType => <li key={eachType.type.name}>{eachType.type.name}</li>)}</ul>
  </div>
});

export default PokemonCard;