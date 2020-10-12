import React, { useState } from "react";
import PokemonDetailModal from "./PokemonDetailModal";
import styles from "./pokemonCardStyle";

export interface IProps {
  dataUrl: string;
  name: string;
  isCreated: boolean;
  stats: { [key: string]: any };
  index: number;
  onDeletePokemon: (index) => void;
}

export default (props: IProps) => {
  const [showModal, setShowModal] = useState(false);

  const onPokemonClick = () => {
    toggleModalVisiblity();
  };

  const toggleModalVisiblity = () => setShowModal(!showModal);

  const onDeletePokemon = (index: number) => {
    toggleModalVisiblity();
    props.onDeletePokemon(index);
  };

  return (
    <div style={styles.cardStyle}>
      <p style={styles.pointerCursor} onClick={onPokemonClick}>
        {props.name}
      </p>
      {showModal && (
        <PokemonDetailModal
          onRequestClose={toggleModalVisiblity}
          dataUrl={props.dataUrl}
          isCreated={props.isCreated}
          stats={props.stats}
          onDeletePokemon={onDeletePokemon}
          index={props.index}
        />
      )}
    </div>
  );
};
