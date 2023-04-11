import React from "react";
import { defaultPageSize } from "../utils/constants";

interface UseResultPaginatedProps<T> {
  initialItems: T[];
}

function useResultsPaginated <T>({ initialItems }: UseResultPaginatedProps<T>) {
  const [items, setItems] = React.useState<T[]>(initialItems);
  const [filteredArray, setfilteredArray] = React.useState<T[]>([]);
  const [pageOffset, setPageOffset] = React.useState(0);

  const paginateArray = React.useCallback(() => {
    const limitPage = defaultPageSize + pageOffset;
    setfilteredArray(items.slice(pageOffset, limitPage));
  }, [setfilteredArray, items, pageOffset]);

  React.useEffect(() => {
    paginateArray();
  }, [paginateArray]);

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const pageOffsetNext = () => {
    setPageOffset((prev) => {
      const totalPages = Math.floor(items.length / defaultPageSize);
      const maxOffset = totalPages * defaultPageSize;
      if (prev < maxOffset) {
        return prev + defaultPageSize;
      }
      return prev;
    });
  };
  const pageOffsetPrev = () => {
    setPageOffset((prev) => {
      if (prev !== 0) {
        return prev - defaultPageSize;
      }
      return prev;
    });
  };

  return {
    filteredArray,
    pageOffsetNext,
    pageOffsetPrev,
    setPageOffset,
  };
};

export default useResultsPaginated;
