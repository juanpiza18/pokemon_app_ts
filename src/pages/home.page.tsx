import React, { useState } from "react";
import Header from "../components/header/header.component";
import PokemonContainer from "../components/pokemon-container/pokemon.container";

const HomePage = () => {
  const [search, setSearch] = useState<string>('');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <Header handleSearch={handleSearch} />
      <main className="homepage__container">
        <PokemonContainer filter={search} />
      </main>
    </>
  );
};

export default HomePage;
