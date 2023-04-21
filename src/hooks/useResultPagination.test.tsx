import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useResultsPaginated from "./useResultsPagination.hooks";

const createInitialItems = (maxNumber: number) => {
  const initialItems: { id: number; name: string }[] = [];
  for (let index = 0; index < maxNumber; index++) {
    const newItem = {
      id: index,
      name: `foo${index}`,
    };
    initialItems.push(newItem);
  }
  return initialItems;
};

describe("useResultsPaginated", () => {
  const initialItems = createInitialItems(30);

  it("should return an object with expected properties", () => {
    const { result } = renderHook(() => useResultsPaginated({ initialItems }));
    expect(result.current).toHaveProperty("filteredArray");
    expect(result.current).toHaveProperty("pageOffsetNext");
    expect(result.current).toHaveProperty("pageOffsetPrev");
    expect(result.current).toHaveProperty("setPageOffset");
  });

  it("should update the filteredArray based on the pageOffset", () => {
    const { result } = renderHook(() => useResultsPaginated({ initialItems }));
    expect(result.current.filteredArray).toEqual(initialItems.slice(0, 21));
    act(() => result.current.setPageOffset(21));
    expect(result.current.filteredArray).toEqual(initialItems.slice(21, 42));
  });

  it("should update the pageOffset correctly with pageOffsetNext and pageOffsetPrev", () => {
    const { result } = renderHook(() => useResultsPaginated({ initialItems }));
    act(() => result.current.pageOffsetNext());
    expect(result.current.pageOffset).toEqual(21);
    act(() => result.current.pageOffsetPrev());
    expect(result.current.pageOffset).toEqual(0);
  });

  it("should update the pageOffset and filteredArray correctly with setPageOffset", () => {
    const { result } = renderHook(() => useResultsPaginated({ initialItems }));
    act(() => result.current.setPageOffset(0));
    expect(result.current.filteredArray).toEqual(initialItems.slice(0, 21));
    act(() => result.current.setPageOffset(21));
    expect(result.current.filteredArray).toEqual(initialItems.slice(21, 42));
  });

  it("should return the prev value if we reached the end of the array on PageOffsetNext", () => {
    const { result } = renderHook(() => useResultsPaginated({ initialItems }));
    act(() => {
      result.current.setPageOffset(21);
      result.current.pageOffsetNext();
    });
    expect(result.current.filteredArray).toEqual(initialItems.slice(21, 42));
  });

  it("should return the prev value if we are in the begining of the array on PageOffsetPrev", () => {
    const { result } = renderHook(() => useResultsPaginated({ initialItems }));
    act(() => {
      result.current.setPageOffset(0);
      result.current.pageOffsetPrev();
    });
    expect(result.current.filteredArray).toEqual(initialItems.slice(0, 21));
  });
});
