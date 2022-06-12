import classes from "./SearchCountry.module.scss";

import { useState, useContext } from "react";

import RestContext from "../../store/rest-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchCountry = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const ctx = useContext(RestContext);

  const searchHandler = (e) => {
    e.preventDefault();
    const value = e.target.value;

    setSearchInput(value);

    if (value.length < 1) {
      return;
    }

    props.onSearch(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className={`${classes.form} ${
        ctx.isDarkMode ? classes["bg-dark"] : classes.bg_white
      }`}
      onSubmit={submitHandler}
    >
      <button className={classes["icon-container"]}>
        <FontAwesomeIcon icon={faSearch} className={classes["search-icon"]} />
      </button>
      <input
        onChange={searchHandler}
        type="text"
        value={searchInput}
        placeholder="Search for a country..."
      />
    </form>
  );
};

export default SearchCountry;
