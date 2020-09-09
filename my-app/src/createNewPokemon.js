import React from 'react';
import axios from 'axios';


function createNewPokemon(props) {
   debugger
    function capitalize(string) {
        if (typeof string === typeof "") {
          let newString = string.charAt(0).toUpperCase() + string.slice(1);
          return newString
        }
      }

    let data = props.data;

    let image = data.sprites.front_default;
    let over = data.sprites.back_default
    let types = data.types;


    let typesContainer = [];

    let pokemonTypes = [];
    let urlListSameType = [];
    try {
        data.types.forEach(element => {
            pokemonTypes.push(element.type.name);
            urlListSameType.push(element.type.url);
        })
    } catch { return }


    types.forEach(element => {
      typesContainer.push(
        <li className='pokemonType' onClick={async () => {
          props.setShow((prevState) => !prevState);
          let pokemonsList = await axios.get(pokemonTypes[types.indexOf(element)]);
          let clone = []
          pokemonsList.data.pokemon.forEach(element => {
            clone.push(
              <li className='pokemonListItem' onClick={() => alert(element.pokemon.name)}  >{element.pokemon.name}  </li>
            )
          })
          props.setPokemonSameType(clone)
        }} >{element}</li>
      )
    })

 
    return(
      <div className='pokemonContainer' >
        <div className='pokemonsname' >Name:{capitalize(data.name)}</div>
        <div className='pokemonsheight' >Height: <br /> {Number(data.height) * 10}cm</div>
        <div className='pokemonsweight' >weight: <br /> {Number(data.weight) / 10}kg</div>
        <img className='pokemonsimage' src={image} onMouseOver={event => event.target.src = over} onMouseOut={event => event.target.src = image}></img>
        <ul className='pokemonTypesList' >Types:{typesContainer}</ul>
      </div>
    )

  }

  export default createNewPokemon;