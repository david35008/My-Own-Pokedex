function getPokemon(pokeIdentifier) {
  axios.defaults.baseURL = 'https://pokeapi.co/api/v2';
  let temperror = axios.get(pokeIdentifier)
    .then(response => response.data)
    .catch(() => { addChild(resultsArea, "notfound" , "Pokemon not found", newPokemon)})
    return temperror;
}

async function showPokemon(searchValue) {
  if (typeof searchValue !== typeof "") { searchValue = searchBoxValue.value.toLowerCase() };
  if (searchValue === "") { return };

  const data = await getPokemon(`/pokemon/${searchValue}`)
  let pokemonTypes = [];
  let urlListSameType = [];
try{
  data.types.forEach(element => {
    pokemonTypes.push(element.type.name);
    urlListSameType.push(element.type.url);
  })} catch {return }

  createNewPokemon(data.name, data.height, data.weight, data.sprites.front_default, data.sprites.back_default, pokemonTypes, urlListSameType);
  searchBoxValue.value = "";
  searchBoxValue.focus();
};

const searchButon = document.getElementById('searchButon');
const searchBoxValue = document.getElementById('search');
const resultsArea = document.getElementById('results');
const newPokemon = document.createElement('div');
const pokemonName = document.createElement('div');
const pokemonHeight = document.createElement('div');
const pokemonWeight = document.createElement('div');
const pokemonImage = document.createElement('img');
const pokemonTypesList = document.createElement('ul');
const pokemonListSameType = document.createElement('ul');

function addChild(parent, className, text, child) {
  parent.appendChild(child);
  child.className = className;
  child.textContent =  capitalizeFirstLetter(text);
  return child;
};

function createNewPokemon(name, height, weight, image, over, types, typesList) {
  addChild(resultsArea, `pokemonContainer`, null, newPokemon);
  addChild(newPokemon, `pokemonsname`, "Name: " + name.charAt(0).toUpperCase() + name.slice(1), pokemonName);
  addChild(newPokemon, `pokemonsheight`, "Height: " + height, pokemonHeight);
  addChild(newPokemon, `pokemonsweight`, "Weight: " + weight, pokemonWeight);
  addChild(newPokemon, `pokemonsimage`, null, pokemonImage);
  addChild(newPokemon, `pokemonTypesList`, `Types:`, pokemonTypesList);
  types.forEach(element => {
    const pokemonType = document.createElement('li');
    addChild(pokemonTypesList, `pokemonType`, element, pokemonType);
    pokemonType.onclick = async () => {
      addChild(pokemonTypesList, "pokemonList", "pokemons from the same type: ", pokemonListSameType);
      let po = await axios.get(typesList[types.indexOf(element)]);
      po.data.pokemon.forEach(element => {
        const pokemon = document.createElement('li');
        addChild(pokemonListSameType, "pokemonListItem", element.pokemon.name, pokemon);
        pokemon.addEventListener("click", () => showPokemon(element.pokemon.name));
      });
    };
  });

  pokemonImage.src = image;
  pokemonImage.onmouseover = () => pokemonImage.src = over;
  pokemonImage.onmouseleave = () => pokemonImage.src = image;
}
function capitalizeFirstLetter(string) {
  if(typeof string === typeof ""){
  let newString = string.charAt(0).toUpperCase() + string.slice(1);
  return newString
}
}
searchButon.addEventListener('click', showPokemon);