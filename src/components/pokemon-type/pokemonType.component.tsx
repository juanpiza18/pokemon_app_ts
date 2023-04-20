import React from "react";
import styles from "./pokemonType.module.css";
 
/* TODO: ENUM */
export type PokemonTypes = {
  [key: string]: {
    styleType: string;
    icon: string;
  }
}

export const types: PokemonTypes = {
  grass: { styleType: "types--green", icon: "fa-leaf" },
  poison: { styleType: "types--purple", icon: "fa-skull-crossbones" },
  fire: { styleType: "types--red", icon: "fa-fire" },
  flying: { styleType: "types--orange", icon: "fa-dove" },
  psychic: { styleType: "types--plum", icon: "fa-shapes" },
  ice: { styleType: "types--blue", icon: "fa-igloo" },
  water: { styleType: "types--lightblue", icon: "fa-water" },
  steel: { styleType: "types--gray", icon: "fa-weight-hanging" },
  moon: { styleType: "types--moon", icon: "fa-moon" },
  dark: { styleType: "types--moon", icon: "fa-moon" },
  ghost: { styleType: "types--moon", icon: "fa-ghost" },
  fighting: { styleType: "types--electric", icon: "fa-hand-fist" },
  electric: { styleType: "types--electric", icon: "fa-cloud-bolt" },
  fairy: { styleType: "types--plum", icon: "fa-wand-magic-sparkles" },
  dragon: { styleType: "types--red", icon: "fa-dragon" },
  bug: { styleType: "types--green", icon: "fa-bug" },
  rock: { styleType: "types--brown", icon: "fa-gem" },
  ground: { styleType: "types--brown", icon: "fa-gem" },
  unknow: { styleType: "", icon: "fa-question" },
};

export interface PokemonTypeProps {
  nameType: string;
  dataTestId?: string;
}


const PokemonType = ({ nameType, dataTestId }: PokemonTypeProps) => {
  const pokemonType = types[nameType];
  return (
    <>
      {pokemonType ? (
        <div className={`${styles.types} ${styles[pokemonType.styleType]}`} data-testid={dataTestId}>
          <i className={`fa-solid ${pokemonType.icon}`}></i>
          <span>{nameType}</span>
        </div>
      ) : (
        <div className={styles.types} data-testid={dataTestId} >
          <i className="fa-solid fa-paw"></i>
          {nameType}
        </div>
      )}
    </>
  );
};

export default PokemonType;
