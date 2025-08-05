import { useState, useEffect } from 'react';
import { FeaturesList } from './FeaturesList';

function Search() {
  const [inputValue, setInputValue] = useState('');
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/projects');
        const data = await res.json();
        console.log('DATA', data);
        setFeatures(data);
      } catch (err) {
        console.error('Error loading data:', err);
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
      <FeaturesList features={features} regex={inputValue} />
    </>
  );
}

export { Search };
