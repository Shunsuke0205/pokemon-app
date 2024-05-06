import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemonData, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      let response = await getAllPokemonData(initialURL);
      loadPokemon(response.results);
      setLoading(false);
    };
    fetchAllPokemonData();

  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);


  return (
    <div className="App">
      {loading ? (
        <h1>LOADING...</h1>
      ) : (
        <div className="pokemonCardContainer">
          {pokemonData.map((pokemonName, i) => {
            return <Card key={i} pokemon={pokemonName} />
          })}
        </div>
      )}
    </div>
  );
}

export default App;
