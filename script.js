const userInput = document.querySelector(".search__box");
const pokedex = document.querySelector(".cards__container");

const API = fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0");

API.then((res) => res.json()).then((data) => {
  const fetches = data.results.map((pokemon) => {
    return fetch(pokemon.url).then((res) => res.json());
  });
  Promise.all(fetches).then((res) => displayPokemon(res));
  Promise.all(fetches).then((res) => searchData(res));
});

const displayPokemon = (pokemons) => {
  pokemons.forEach((pokemon) => {
    const individualPoke = [];
    pokemon.types.forEach((type) => individualPoke.push(type.type.name));
    let typeStrings = individualPoke.join(" ");
    pokedex.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
       <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}" class="card-img"/>
         <p class="poke__name">${pokemon.name}</p>
         <p class="poke__types">${typeStrings}</p>
     </div>`
    );
  });
};

const searchData = (datares) => {
  // console.log(datares);
  datares.filter((data) => console.log(data));
  console.log(userInput.value);

  // namesss.map((names) => names === userInput);

  // pokedex.insertAdjacentHTML(
  //   "beforeend",
  //   `<div class="card">
  //    <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}" class="card-img"/>
  //      <p class="poke__name">${pokemon.name}</p>
  //      <p class="poke__types">${typeStrings}</p>
  //  </div>`
  // );
};

userInput.addEventListener("keyup", searchData);
