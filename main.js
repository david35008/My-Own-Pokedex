function getPokemon(pokeIdentifier) {
  axios.defaults.baseURL = 'https://pokeapi.co/api/v2';
  let temperror = axios.get(pokeIdentifier)
    .then(response => response.data)
    .catch(() => { addChild(resultsArea, "notfound" , "Pokemon not found", newPokemon)})
    return temperror;
}

async function showPokemon(eabba) {
  if (typeof eabba !== typeof "") { eabba = searchBoxValue.value };
  if (eabba === "") { return };

  const data = await getPokemon(`/pokemon/${eabba}`)
  let types = [];
  let typesList = [];
try{
  data.types.forEach(element => {
    types.push(element.type.name);
    typesList.push(element.type.url);
  })} catch {return }

  makeDiv(data.name, data.height, data.weight, data.sprites.front_default, data.sprites.back_default, types, typesList);
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
const pokemonList = document.createElement('ul');

function addChild(parent, className, text, child) {
  parent.appendChild(child);
  child.className = className;
  child.textContent = text;
  return child;
};

function makeDiv(name, height, weight, image, over, types, typesList) {
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
      addChild(pokemonTypesList, "pokemonList", "pokemons from the same type: ", pokemonList);
      let po = await axios.get(typesList[types.indexOf(element)]);
      po.data.pokemon.forEach(element => {
        const pokemon = document.createElement('li');
        addChild(pokemonList, "pokemonListItem", element.pokemon.name, pokemon);
        pokemon.addEventListener("click", () => showPokemon(element.pokemon.name));
      });
    };
  });

  pokemonImage.src = image;
  pokemonImage.onmouseover = () => pokemonImage.src = over;
  pokemonImage.onmouseleave = () => pokemonImage.src = image;
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
searchButon.addEventListener('click', showPokemon);