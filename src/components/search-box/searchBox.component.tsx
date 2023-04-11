import React from "react";
import styles from "./searchBox.module.css";
import { debounce } from "../../utils/utils";

interface SearchBoxProps {
    placeHolder: string;
    handleChange?: (event:React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ placeHolder, handleChange = () => {} }: SearchBoxProps) => {
  const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => handleChange(event));
  return (
    <div className={styles.search__container}>
      <input
        className={styles.search}
        type="search"
        placeholder={placeHolder}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBox;
