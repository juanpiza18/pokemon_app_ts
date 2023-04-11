import React from "react";
import { Pokemon, Image } from "../../models/pokemon.type";
import PokemonType from "../pokemon-type/pokemonType.component";
import styles from "./pokemonProfile.module.css";

interface PokemonProfileProps {
  pokemon: Pokemon | undefined;
  image: Image;
}

const PokemonProfile = ({ pokemon, image }: PokemonProfileProps) => {
  return (
    <div className={styles.pokemon__heading}>
      <span className={styles.heading__number}> #{pokemon?.id}</span>
      <img
        className={styles.heading__image}
        src={image ?? ''}
        alt={`Pokemon - ${pokemon?.name}`}
      />
      <div className={styles.pokemonheading__information}>
        <h1 className={styles.pokemonheading__name}> {pokemon?.name}</h1>
        <div className={styles.pokemonheading__types}>
          {pokemon?.types.map(({ type }, index) => (
            <PokemonType key={index} nameType={type.name} />
          ))}
        </div>
      </div>
      <div className={styles.pokemon__basic}>
        <div className={styles.group__info}>
          <h3> Height </h3>
          <span> {pokemon?.height}</span>
        </div>
        <div className={styles.group__info}>
          <h3> Weight </h3>
          <span> {pokemon?.weight}</span>
        </div>
        <div className={styles.group__info}>
          <h3> Base Experience </h3>
          <span> {pokemon?.base_experience}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonProfile;
