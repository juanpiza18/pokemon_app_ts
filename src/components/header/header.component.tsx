import React from "react";
import { Link, useParams } from "react-router-dom";
import SearchBox from "../search-box/searchBox.component";
import logo from "../../assets/Pokedex_logo.png";
import styles from "./header.module.css";

export interface HeaderProps {
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header = ({ handleSearch }: HeaderProps) => {
  const { id } = useParams();
  return (
    <header>
      <img className={styles.pokedex__logo} src={logo} alt="Pokedex logo" />
      {id ? (
        <></>
      ) : (
        <SearchBox placeHolder="Search Pokemon" handleChange={handleSearch} />
      )}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
