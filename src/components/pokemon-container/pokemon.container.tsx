import React, { useContext, useEffect } from "react";
import PokemonContext from "../../context/pokemonContext";
import PokemonList from "../card-list/cardList.component";
import useResultsPaginated from "../../hooks/useResultsPagination.hooks";
import Pagination from "../pagination/pagination.component";
import { Pokemon } from "../../models/pokemon.type";

export interface PokemonContainerProps {
  filter?: string | null;
}

const PokemonContainer = ({ filter = null }: PokemonContainerProps) => {
  const {
    loading,
    dataList,
    filteredList,
    paginationNext,
    paginationPrev,
    filterAllList,
    fetchData,
  } = useContext(PokemonContext);

  const { filteredArray, pageOffsetNext, setPageOffset, pageOffsetPrev } =
    useResultsPaginated<Pokemon>({ initialItems: filteredList });

  useEffect(() => {
    if (filter) {
      setPageOffset(0);
      filterAllList(filter);
    } else {
      fetchData();
    }
  }, [fetchData, filterAllList, setPageOffset, filter]);

  const list = filter ? filteredArray : dataList;

  return (
    <div className="flex__container">
      <Pagination
        paginationNext={filter ? pageOffsetNext : paginationNext}
        paginationPrev={filter ? pageOffsetPrev : paginationPrev}
      />
      <div className="card__grid" data-testid="pokemon-list">
        <PokemonList loading={loading} list={list} />
      </div>
    </div>
  );
};

export default PokemonContainer;
