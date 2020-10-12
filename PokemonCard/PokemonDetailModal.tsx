import React, { useEffect, useState } from "react";
import styles from "./pokemonCardStyle";

export interface IProps {
  dataUrl: string;
  onRequestClose: () => void;
  stats: { [key: string]: any };
  isCreated: boolean;
  onDeletePokemon: (index: number) => void;
  index: number;
}

export interface IState {
  loading: boolean;
  error: boolean;
  data: { [key: string]: any };
}

export default (props: IProps) => {
  const getInitialState = () => {
    if (!props.isCreated) {
      return {
        loading: true,
        error: false,
        data: {}
      };
    }
    return {
      loading: false,
      error: false,
      data: props.stats.pokeDetails
    };
  };

  const [dataState, setDataState] = useState<IState>(getInitialState());

  const onApiError = err => {
    setDataState({
      loading: false,
      error: true,
      data: { ...dataState.data }
    });
  };

  const onApiSuccess = data => {
    const pokeDetails = {
      hp: 0,
      attack: 0,
      defense: 0,
      types: []
    };
    data.stats.forEach(stat => {
      if (pokeDetails[stat.stat.name] !== undefined) {
        pokeDetails[stat.stat.name] = stat.base_stat;
      }
    });
    pokeDetails["types"] = data.types.map(({ type }) => type.name);
    setDataState({
      loading: false,
      error: false,
      data: pokeDetails
    });
  };

  const onDeletePokemon = () => {
    props.onDeletePokemon(props.index);
  };

  useEffect(() => {
    if (!props.isCreated) {
      fetch(props.dataUrl)
        .then(response => response.json())
        .then(onApiSuccess)
        .catch(onApiError);
    }
  }, []);

  if (dataState.loading) return <p>Loading...</p>;
  if (dataState.error) return <p>Error fetching details</p>;

  return (
    <div style={{ ...styles.flexColumnCenter, ...styles.modal }}>
      <div style={styles.modalCard}>
        <p>HP : {dataState.data.hp}</p>
        <p>Attack : {dataState.data.attack}</p>
        <p>Defence : {dataState.data.defense}</p>
        <p>types : {dataState.data.types.join(", ")}</p>
        <button style={{ alignSelf: "center" }} onClick={props.onRequestClose}>
          Close
        </button>
        <button style={{ alignSelf: "center" }} onClick={onDeletePokemon}>
          Delete
        </button>
      </div>
    </div>
  );
};
