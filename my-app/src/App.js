import React, { useState } from 'react';
import SearchPokemon from './SearchPokemon'

function App() {

  const [inputValue, setInputValue] = useState('')
  const [reasault, setReasault] = useState('')
  const [show, setShow] = useState(false)
  const [pokemonSameType, setPokemonSameType] = useState([])

  return (

    <div id='resultsArea' >
      <SearchPokemon setReasault={setReasault} setShow={setShow} setPokemonSameType={setPokemonSameType}  inputValue={inputValue} setInputValue={setInputValue}  />
      {reasault}
      {show &&
        <ul className='pokemonList' >Pokemons:{pokemonSameType}</ul>
      }

    </div>



  )
}


export default App;
