import React from "react";
import "./Style.scss";

export const SearchBlog = ({
  searchInput,
  handleSearch,
  handleClickSearch,
}) => {
  return (
    <form className="form-home">
      <input
        className={`form-input ${
          searchInput.trim() === "" && "hide-search-input"
        }`}
        value={searchInput}
        onChange={handleSearch}
        type="text"
        placeholder="Search..."
      />
      <button
        className={`search-button ${
          searchInput.trim() === "" && "hide-search-home"
        }`}
        type="submit"
        onClick={handleClickSearch}
      >
        &#x1F50E;
      </button>
    </form>
  );
};
