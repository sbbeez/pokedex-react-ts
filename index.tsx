import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import styles from "./style";
import PokemonCard from "./PokemonCard/PokemonCard";
import AddPokemon from "./AddPokemon/AddPokemon";

export interface IState {
  loading: boolean;
  error: boolean;
  data: { [key: string]: any };
}

const App = (props: {}) => {
  const [pokemonList, setPokemonList] = useState<IState>({
    loading: true,
    error: false,
    data: {}
  });
  const [showAddPokemonModal, setShowAddPokemonModal] = useState<boolean>(
    false
  );

  const toggleAddPokemon = () => setShowAddPokemonModal(!showAddPokemonModal);

  const onAddPokemon = data => {
    toggleAddPokemon();
    const newPokemonList = {
      results: [{ isCreated: true, ...data }, ...pokemonList.data.results]
    };
    setPokemonList({
      loading: false,
      error: false,
      data: { ...newPokemonList }
    });
  };

  const onDeletePokemon = (index: number) => {
    const pokemonListData = { ...pokemonList.data };
    pokemonListData.results.splice(index, 1);
    setPokemonList({
      loading: false,
      error: false,
      data: { ...pokemonListData }
    });
  };

  const onApiError = err => {
    setPokemonList({
      loading: false,
      error: true,
      data: { ...pokemonList.data }
    });
  };

  const onApiSuccess = data => {
    setPokemonList({
      loading: false,
      error: false,
      data
    });
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
      .then(response => response.json())
      .then(onApiSuccess)
      .catch(onApiError);
  }, []);

  const rowRenderer = (pokemon, index) => (
    <PokemonCard
      key={index}
      index={index}
      name={pokemon.name.toUpperCase()}
      dataUrl={pokemon.url}
      isCreated={pokemon.isCreated}
      stats={pokemon}
      onDeletePokemon={onDeletePokemon}
    />
  );

  if (pokemonList.loading) return <p>Loading...</p>;
  if (pokemonList.error) return <p>Error</p>;

  return (
    <div>
      <button style={{ alignSelf: "center" }} onClick={toggleAddPokemon}>
        Add a Pokemon
      </button>
      <div style={styles.pokemonContainer}>
        {pokemonList.data.results.map(rowRenderer)}
        {showAddPokemonModal && (
          <AddPokemon
            onAddPokemon={onAddPokemon}
            onRequestClose={toggleAddPokemon}
          />
        )}
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
