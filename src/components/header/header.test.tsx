import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./header.component";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Header Component", () => {
  it("renders the logo", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logo = screen.getByAltText("Pokedex logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render header component", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const searchBox = screen.getByPlaceholderText("Search Pokemon");
    expect(searchBox).toBeInTheDocument();
  });

  it("should not render search box component", () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/1"]}>
        <Routes>
          <Route path="/pokemon/:id" element={<Header />} />
        </Routes>
      </MemoryRouter>
    );
    const searchBox = screen.queryByPlaceholderText("Search Pokemon");
    expect(searchBox).not.toBeInTheDocument();
  });

  it("renders the search box when id is not in the URL", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );
    const searchBox = screen.getByPlaceholderText("Search Pokemon");
    expect(searchBox).toBeInTheDocument();
  });

  it("should render de home link when id is not in the URL", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );
    const homeLink = screen.getByText("Home", { exact: false });
    expect(homeLink).toBeInTheDocument();
  });

  it("should render de home link when id is in the URL", () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/1"]}>
        <Routes>
          <Route path="/pokemon/:id" element={<Header />} />
        </Routes>
      </MemoryRouter>
    );
    const homeLink = screen.getByText("Home", { exact: false });
    expect(homeLink).toBeInTheDocument();
  });
});
