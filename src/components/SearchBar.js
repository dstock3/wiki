import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query) {
      history.push(`/search/${query}`);
    }
  };

  return (
    <div className="search-bar-container">
      <input 
        type="text" 
        placeholder="Search" 
        value={query} 
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;