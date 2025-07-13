import { useState, useEffect, useCallback } from "react";
import "../index.css";
import FeaturesList from "./FeaturesList";
import features from "../data/features";
import debounce from "lodash.debounce";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 3000),
    []
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return (
    <>
      <input
        id="searchInput"
        placeholder="Find a feature"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <FeaturesList features={features} regex={searchQuery} />
    </>
  );
}

export default Search;
