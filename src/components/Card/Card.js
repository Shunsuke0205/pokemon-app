import React from 'react';
import './Card.css';

const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>type</div>
        {pokemon.types.map((iType) => {
          return (
            <div key={iType.type.name}>
              <span className="typeName">{iType.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInformation">
        <div className="cardData">
          <p className="title">Weight: {pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">Height: {pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">Abilities: {pokemon.abilities[0].ability.name}</p>
        </div>

      </div>
    </div>
  );
};

export default Card