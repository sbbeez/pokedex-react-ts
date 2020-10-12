export interface IProps {
  onAddPokemon: (details: {}) => void;
  onRequestClose: () => void;
}
export interface IState {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  types: string;
}

export const pokemonObjectFactory = (stats: IState) => {
  return {
    name: stats.name,
    pokeDetails: {
      ...stats,
      types: stats.types.split(",")
    }
  };
};
