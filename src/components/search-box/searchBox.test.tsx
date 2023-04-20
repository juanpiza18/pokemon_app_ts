import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SearchBox from "./searchBox.component";

describe("SearchBox", () => {
  it("should call the handleSearch when the search value change", async () => {
    const mockHandleSearch = jest.fn(() => ({
      target: { value: "charmander" },
    }));
    const { getByPlaceholderText } = render(
      <SearchBox placeHolder="Search Pokemon" handleChange={mockHandleSearch} />
    );
    const searchInput = getByPlaceholderText(
      "Search Pokemon"
    ) as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
    const searchValue = "charmander";
    expect(mockHandleSearch).toHaveBeenCalledTimes(0);
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: searchValue } });
    });
    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledTimes(1);
      expect(searchInput.value).toEqual(searchValue);
    });
  });
});
