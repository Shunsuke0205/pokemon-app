export const getAllPokemonData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => resolve(data));
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      resolve(data);
    });
  });
};