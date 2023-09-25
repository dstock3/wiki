import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      history.push(`/search?query=${query}`);
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch}>
        <input 
          type="text"
          className="search-input" 
          placeholder="Search" 
          value={query} 
          onChange={handleInputChange}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;