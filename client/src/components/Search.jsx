import { useState, useEffect } from "react";
import { FeaturesList } from "./FeaturesList";


function Search() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [features, setFeatures] = useState([]);

  useEffect((value) => {
     setSearchQuery(value);
  }, [inputValue]);


  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setFeatures(data);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchFeatures();
  }, []);

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
