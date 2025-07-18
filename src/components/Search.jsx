import { useState, useEffect } from "react";
import { FeaturesList } from "./FeaturesList";
import features from "../data/features";
import debounce from "lodash.debounce";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return (
    <>
      <input
        className="search-input"
        placeholder="Find a feature"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <FeaturesList features={features} regex={searchQuery} />
    </>
  );
}

export { Search };
