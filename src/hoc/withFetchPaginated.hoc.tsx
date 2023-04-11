import React, { useContext, useEffect, ComponentType, FC } from "react";
import useResultsPaginated from "../hooks/useResultsPagination.hooks";
import Pagination from "../components/pagination/pagination.component";
import PokemonContext from "../context/pokemonContext";

interface FetchProps {
  filter?: string;
}

const WithFetchPaginated = <P extends object>(WrappedComponent: ComponentType<P>, contextProvider = PokemonContext): FC<P & FetchProps> =>{
  return function Fetch({ filter, ...otherProps }: P & FetchProps) {
    const {
      loading,
      dataList,
      filteredList,
      filterAllList,
      fetchData,
      paginationNext,
      paginationPrev,
    } = useContext(contextProvider);

    const { filteredArray, pageOffsetNext, setPageOffset, pageOffsetPrev } =
      useResultsPaginated({ initialItems: filteredList });

    useEffect(() => {
      if (filter) {
        setPageOffset(0);
        filterAllList(filter);
      } else {
        fetchData();
      }
    }, [fetchData, filterAllList, setPageOffset, filter]);

    const data = filter ? filteredArray : dataList;
    const prev = filter ? pageOffsetPrev : paginationPrev;
    const next = filter ? pageOffsetNext : paginationNext;
    const componentProps = {
      list: data,
      loading: loading
    } as P;

    return (
      <div className="flex__container">
        <Pagination paginationNext={next} paginationPrev={prev} />
        <div className="card__grid">
          <WrappedComponent {...otherProps} {...componentProps} />
        </div>
      </div>
    );
  };
}

export default WithFetchPaginated;
