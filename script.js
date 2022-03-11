const userInput = document.querySelector(".input");
const pokeName = document.querySelector(".card-text");
const pokedex = document.querySelector(".cards__container");

const API = fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0");

API.then((res) => res.json()).then((data) => {
  const fetches = data.results.map((pokemon) => {
    return fetch(pokemon.url).then((res) => res.json());
  });
  Promise.all(fetches).then((res) => displayPokemon(res));
});

const displayPokemon = (pokemons) => {
  pokemons.forEach((pokemon) => {
    const types = [];
    pokemon.types.forEach((type) => types.push(type.type.name));
    let typesString = types.join(" ");
    pokedex.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
       <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}" class="card-img"/>
         <p class="poke__name">${pokemon.name}</p>
         <p class="poke__types">${typesString}</p>
     </div>`
    );
  });
};
