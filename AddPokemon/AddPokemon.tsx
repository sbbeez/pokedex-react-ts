import React, { useState } from "react";
import styles from "./addPokemonStyle";
import { IProps, IState, pokemonObjectFactory } from "./helper";

export default (props: IProps) => {
  const [stats, setStats] = useState<IState>({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    types: ""
  });

  const onFormChange = (value, key) => {
    setStats({ ...stats, [`${key}`]: value });
  };

  const onSubmit = event => {
    event.preventDefault();
    props.onAddPokemon(pokemonObjectFactory(stats));
  };

  return (
    <div style={{ ...styles.modal, ...styles.flexColumnCenter }}>
      <div style={{ ...styles.modalCard, ...styles.flexColumnCenter }}>
        <h3>Add pokemon</h3>
        <form onSubmit={onSubmit}>
          <input
            required
            style={styles.inputStyle}
            placeholder="Enter Pokemon name"
            onChange={event => {
              onFormChange(event.target.value, "name");
            }}
          />
          <input
            required
            style={styles.inputStyle}
            placeholder="Enter HP stat"
            type="number"
            onChange={event => {
              onFormChange(event.target.value, "hp");
            }}
          />
          <input
            required
            style={styles.inputStyle}
            placeholder="Enter attack stat"
            type="number"
            onChange={event => {
              onFormChange(event.target.value, "attack");
            }}
          />
          <input
            required
            style={styles.inputStyle}
            placeholder="Enter defense stat"
            type="number"
            onChange={event => {
              onFormChange(event.target.value, "defense");
            }}
          />
          <input
            required
            style={styles.inputStyle}
            placeholder="Enter types (Comma seperated)"
            onChange={event => {
              onFormChange(event.target.value, "types");
            }}
          />
          <div style={{ display: "flex" }}>
            <input
              style={{ alignSelf: "center" }}
              type="submit"
              value="Add Pokemon"
            />
            <button
              style={{ alignSelf: "center" }}
              onClick={props.onRequestClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
