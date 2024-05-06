import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemonData, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [previousURL, setPreviousURL] = useState("");

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      let response = await getAllPokemonData(initialURL);
      loadPokemon(response.results);
      setLoading(false);
      // console.log(response);
      setNextURL(response.next);
      setPreviousURL(response.previous);
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

  // console.log(pokemonData);

  const handlePreviousPage = async () => {
    if (previousURL === null) {
      return;
    }

    setLoading(true);
    const data = await getAllPokemonData(previousURL);
    await loadPokemon(data.results);
    setLoading(false);
    setNextURL(data.next);
    setPreviousURL(data.previous);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemonData(nextURL);
    // console.log(data);
    await loadPokemon(data.results);
    setLoading(false);
    setNextURL(data.next);
    setPreviousURL(data.previous);
  };


  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>LOADING...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemonName, i) => {
                return <Card key={i} pokemon={pokemonName} />
              })}
            </div>
            <div className="btn">
              <button onClick={handlePreviousPage}>Previous</button>
              <button onClick={handleNextPage}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
