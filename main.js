// const searchPokemon = async (pokemonId) => {
//   const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
//   makeDiv(data.name, data.height, data.weight, data.sprites.front_default, data.sprites.back_default)
//   .catch((error) => { alert("Pokemon not found\n" + error.message); })
//   searchBoxValue.value = ""
//   searchBoxValue.focus();
// };


function getPokemon(pokeIdentifier) {
  const API_URL = 'https://pokeapi.co/api/v2';
  axios.defaults.baseURL = API_URL;

  return axios.get(pokeIdentifier)
    .then(response => response.data)
    .catch((error) => { alert("Pokemon not found\n" + error.message); })
}

// async function search(data) {

//   searchPokemon(searchBoxValue.value);

// }
async function showPokemon(eabba) {
  if (typeof eabba !== typeof ""){ eabba = searchBoxValue.value}
  if (eabba === ""){return}

  const data = await getPokemon(`/pokemon/${eabba}`);
  let types = [];
  let typesList = [];
  data.types.forEach(element => {
    types.push(element.type.name);
    typesList.push(element.type.url);
  });

  makeDiv(data.name, data.height, data.weight, data.sprites.front_default, data.sprites.back_default, types, typesList)
  searchBoxValue.value = ""
  searchBoxValue.focus();
}

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

async function makeDiv(name, height, weight, image, over, types, typesList) {
  resultsArea.appendChild(newPokemon);
  newPokemon.id = `${name}`;
  newPokemon.className = `pokemonContainer`
  newPokemon.appendChild(pokemonName);
  pokemonName.className = `pokemonsname`;
  newPokemon.appendChild(pokemonHeight);
  pokemonHeight.className = `pokemonsheight`;
  newPokemon.appendChild(pokemonWeight);
  pokemonWeight.className = `pokemonsweight`;
  newPokemon.appendChild(pokemonImage);
  pokemonImage.className = `pokemonsimage`;
  pokemonName.textContent = "Name: " + name.charAt(0).toUpperCase() + name.slice(1);
  pokemonHeight.textContent = "Height: " + height;
  pokemonWeight.textContent = "Weight: " + weight;
  newPokemon.appendChild(pokemonTypesList);
  pokemonTypesList.className = `pokemonTypesList`;
  pokemonTypesList.textContent = `Types:`
  types.forEach(element => {
    const pokemonType = document.createElement('li');
    pokemonTypesList.appendChild(pokemonType);
    pokemonType.className = `pokemonType`;
    pokemonType.textContent = element
    pokemonType.onclick = async () => {
      pokemonTypesList.appendChild(pokemonList);
        pokemonList.id = "pokemonList";
        pokemonList.textContent = "pokemons from the same type: "
        let po = await axios.get(typesList[types.indexOf(element)]);
        po.data.pokemon.forEach(element => {
          const pokemon = document.createElement('li');
          pokemon.textContent = element.pokemon.name;
          pokemonList.appendChild(pokemon);
          pokemon.addEventListener("click" , getspas)
          function getspas() {
            showPokemon(element.pokemon.name)
          }
        })
     
    }
  });


  pokemonImage.src = image;
  pokemonImage.onmouseover = () => pokemonImage.src = over;
  pokemonImage.onmouseleave = () => pokemonImage.src = image;

}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
searchButon.addEventListener('click', showPokemon);
//  try{} catch (error) {
//   console.log(2);
// }
//https://pokeapi.co/api/v2/type/{id or name}/
//https://pokeapi.co/docs/v2#types
