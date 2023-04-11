import { Stats } from "../../models/pokemon.type";
import React from "react";
import styles from "./statsStyles.module.css";

interface PokemonStatsProps {
  stats: Stats[] | undefined;
}

const PokemonStats = ({ stats }: PokemonStatsProps) => {
  return (
    <div className={styles.pokemon__stats}>
      <h2 className={styles.pokemon__title}>Stats</h2>
      {stats?.map((stat, index) => (
        <div key={index} className={styles.stat__group}>
          <span className={styles.stat__span}>{stat.stat.name}</span>
          <progress value={stat.base_stat} max={230} />
          <span className={styles.stat__span}>{stat.base_stat}</span>
        </div>
      ))}
    </div>
  );
};

export default PokemonStats;
