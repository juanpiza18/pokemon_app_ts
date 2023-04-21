import React, {
  useContext,
  useEffect,
  ComponentType,
  FC,
  Context,
} from "react";
import useResultsPaginated from "../hooks/useResultsPagination.hooks";
import Pagination from "../components/pagination/pagination.component";

interface FetchProps {
  filter?: string;
}

const WithFetchPaginated = <P extends object>(
  WrappedComponent: ComponentType<P>,
  contextProvider: Context<any>
): FC<FetchProps> => {
  return function Fetch({ filter }: FetchProps) {
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
      loading: loading,
    } as P;

    return (
      <div className="flex__container">
        <Pagination paginationNext={next} paginationPrev={prev} />
        <div className="card__grid" data-testid="list">
          <WrappedComponent {...componentProps} />
        </div>
      </div>
    );
  };
};

export default WithFetchPaginated;
