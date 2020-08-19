import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


function SearchPokemon(props) {


const [id, setId] = useState()

function capitalize(string) {
    if (typeof string === typeof "") {
      let newString = string.charAt(0).toUpperCase() + string.slice(1);
      return newString
    }
  }


function createNewPokemon(name, height, weight, image, over, types, typesList, id) {
    props.setInputValue('')
    inputRef.current.focus()
    let typesContainer = [];
  types.forEach(element => {
    typesContainer.push(
      <li className='pokemonType' onClick={async () => {
        props.setShow(true);
        let pokemonsList = await axios.get(typesList[types.indexOf(element)]);
        let clone = []
        pokemonsList.data.pokemon.forEach(element => {
            debugger
          clone.push(
            <li className='pokemonListItem' onClick={() => showPokemon(element.pokemon.name)}  >{element.pokemon.name}  </li>
          )
        })
        props.setPokemonSameType(clone)
      }} >{element}</li>
    )
  })

  props.setReasault(
    <div className='pokemonContainer' >
      <div className='pokemonsname' >Name:{capitalize(name)}</div>
      <div className='pokemonsheight' >Height: <br /> {Number(height) * 10}cm</div>
      <div className='pokemonsweight' >weight: <br /> {Number(weight) / 10}kg</div>
      <img className='pokemonsimage' src={image} onMouseOver={event => event.target.src = over} onMouseOut={event => event.target.src = image}></img>
      <ul className='pokemonTypesList' >Types:{typesContainer}</ul>
    </div>
  )

}


    function getPokemon(pokeIdentifier) {
        axios.defaults.baseURL = 'https://pokeapi.co/api/v2';
        let pokemonData = axios.get(pokeIdentifier)
            .then(response => response.data)
            .catch(() => props.setReasault(<div className='notfound' >"Pokemon not found"</div>))
        return pokemonData;
    }

    async function showPokemon(searchValue = 1) {
        props.setShow(false);
        const data = await getPokemon(`/pokemon/${searchValue}`)
        let pokemonTypes = [];
        let urlListSameType = [];
        try {
            data.types.forEach(element => {
                pokemonTypes.push(element.type.name);
                urlListSameType.push(element.type.url);
            })
        } catch { return }
        setId(data.id)
        createNewPokemon(data.name, data.height, data.weight, data.sprites.front_default, data.sprites.back_default, pokemonTypes, urlListSameType);

    };

    const nextPokemon = () => {
        if (id < 806) {
            showPokemon((id + 1).toString())
        }
    }

    const prevPokemon = () => {
        if (id > 1) {
            showPokemon((id - 1).toString())
        }
    }
 
    const inputRef = useRef();
    


    return (

        <>
            <input id='searchInputBox' ref={inputRef} onChange={event => {props.setInputValue(event.target.value)}} value={props.inputValue} ></input>
            <button id='searchButon' onClick={() => {showPokemon(props.inputValue)}} ></button>
            <button id='nextPokemon' onClick={() => { nextPokemon() }}></button>
             <button id='previosPokemon' onClick={() => { prevPokemon()}} ></button> 
            <label id="whatToDO">You can type name \ number:</label>
            <div id="firstLed" class="firstLedBackround"></div>
            <div id="secondLed" class="secondLedBackround"></div>
        </>
    )


       
     
 
       


}
export default SearchPokemon;