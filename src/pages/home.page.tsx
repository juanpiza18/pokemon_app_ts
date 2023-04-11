import React, { useState } from "react";
import Header from "../components/header/header.component";
// import PokemonContainer from "../components/pokemon-container/pokemon.container";
import Pokemon2Container from "../components/pokemon-container/pokemon2.container";

const HomePage = () => {
  const [search, setSearch] = useState<string>('');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <Header handleSearch={handleSearch} />
      <main className="homepage__container">
        {/* <PokemonContainer filter={search} /> */}
        <Pokemon2Container filter={search} />
      </main>
    </>
  );
};

export default HomePage;
