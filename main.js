const searchButon = document.getElementById('searchButon');
const searchInputBox = document.getElementById('searchInputBox');
const resultsArea = document.getElementById('resultsArea');
const nextPokemon = document.getElementById('nextPokemon');
const previosPokemon = document.getElementById('previosPokemon');
const newPokemon = document.createElement('div');
const pokemonName = document.createElement('div');
const pokemonHeight = document.createElement('div');
const pokemonWeight = document.createElement('div');
const pokemonImage = document.createElement('img');
const pokemonTypesList = document.createElement('ul');
const pokemonsListSameType = document.createElement('ul');

function getPokemon(pokeIdentifier) {
    axios.defaults.baseURL = 'https://pokeapi.co/api/v2';
    let pokemonData = axios.get(pokeIdentifier)
        .then(response => response.data)
        .catch(() => { addChild(resultsArea, "notfound", "Pokemon not found", newPokemon) })
    return pokemonData;
}

async function showPokemon(searchValue) {
    if (typeof searchValue !== typeof "") { searchValue = searchInputBox.value.toLowerCase() };
    if (searchValue === "") { return };
    document.getElementById('firstLed').className = "secondLedBackround";
    document.getElementById('secondLed').className = "firstLedBackround";
    const data = await getPokemon(`/pokemon/${searchValue}`)
    let pokemonTypes = [];
    let urlListSameType = [];
    try {
        data.types.forEach(element => {
            pokemonTypes.push(element.type.name);
            urlListSameType.push(element.type.url);
        })
    } catch { return }

    createNewPokemon(data.name, data.height, data.weight, data.sprites.front_default, data.sprites.back_default, pokemonTypes, urlListSameType, data.id);
    searchInputBox.value = "";
    searchInputBox.focus();
};

function addChild(parent, className, text, child) {
    parent.appendChild(child);
    child.className = className;
    child.textContent = capitalize(text);
    return child;
};

function createNewPokemon(name, height, weight, image, over, types, typesList, id) {
    addChild(resultsArea, `pokemonContainer`, null, newPokemon);
    addChild(newPokemon, `pokemonsname`, "Name: " + name.charAt(0).toUpperCase() + name.slice(1), pokemonName);
    addChild(newPokemon, `pokemonsheight`, "Height: " + `${Number(height)*10}cm`, pokemonHeight);
    addChild(newPokemon, `pokemonsweight`, "Weight: " + `${Number(weight)/10}kg`, pokemonWeight);
    addChild(newPokemon, `pokemonsimage`, null, pokemonImage);
    addChild(newPokemon, `pokemonTypesList`, `Types:`, pokemonTypesList);
    nextPokemon.onclick = () => {
        if (id < 806) {
            showPokemon((id + 1).toString())
        }
    }
    previosPokemon.onclick = () => {
        if (id > 1) {
            showPokemon((id - 1).toString())
        }
    }
    types.forEach(element => {
        const pokemonType = document.createElement('li');
        addChild(pokemonTypesList, `pokemonType`, element, pokemonType);
        pokemonType.onclick = async() => {
            addChild(pokemonTypesList, "pokemonList", "pokemons: ", pokemonsListSameType);
            let pokemonsList = await axios.get(typesList[types.indexOf(element)]);
            pokemonsList.data.pokemon.forEach(element => {
                const pokemon = document.createElement('li');
                addChild(pokemonsListSameType, "pokemonListItem", element.pokemon.name, pokemon);
                pokemon.addEventListener("click", () => showPokemon(element.pokemon.name));
            });
        };
    });
    document.getElementById('firstLed').className = "firstLedBackround";
    document.getElementById('secondLed').className = "secondLedBackround";
    pokemonImage.src = image;
    pokemonImage.onmouseover = () => pokemonImage.src = over;
    pokemonImage.onmouseleave = () => pokemonImage.src = image;
}

function capitalize(string) {
    if (typeof string === typeof "") {
        let newString = string.charAt(0).toUpperCase() + string.slice(1);
        return newString
    }
}
searchButon.addEventListener('click', showPokemon);