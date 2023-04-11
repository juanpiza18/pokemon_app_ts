import React from "react";
import { Link } from "react-router-dom";
import PokemonType from "../pokemon-type/pokemonType.component";
import styles from "./pokemonCard.module.css";
import { Types } from "../../models/pokemon.type";

interface PokemonCardProps {
    imageUrl: string;
    pokemonName: string;
    pokemonNumber: number;
    pokemonType: Types[];

}

const PokemonCard = ({
  imageUrl,
  pokemonName,
  pokemonNumber,
  pokemonType = [],
}: PokemonCardProps) => {
  return (
    <Link className={styles.card__link} to={`/pokemon/${pokemonNumber}`}>
      <div className={styles["card-container"]}>
        <div className={styles.pokemon__info}>
          <span className={styles.pokemon__number}>#{pokemonNumber}</span>
          <h2 className={styles.pokemon__name}>{pokemonName}</h2>
        </div>
        <img
          className={styles.pokemon__image}
          src={imageUrl}
          alt={`Pokemon ${pokemonName}`}
        />
        <div className={styles.pokemon__types}>
          {pokemonType.map(({ type }, index) => (
            <PokemonType key={index} nameType={type.name} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
