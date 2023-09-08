import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SearchResultsPage.css';

const SearchResultsPage = ({ match }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch search results based on query (match.params.query)
    // currently using hardcoded data
    const fetchedData = [
      {
        title: "Sample Article 1",
        excerpt: "This is a brief snippet from Sample Article 1...",
      },
      {
        title: "Sample Article 2",
        excerpt: "Here's another snippet from Sample Article 2...",
      }
    ];
    
    setSearchResults(fetchedData);
  }, [match.params.query]);

  return (
    <div className="search-results-page">
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <div key={index} className="search-result">
            <h2><Link to={`/${match.params.portalid}/article/${result.title}`}>{result.title}</Link></h2>
            <p>{result.excerpt}</p>
          </div>
        ))
      ) : (
        <p>No results found for "{match.params.query}".</p>
      )}
    </div>
  );
};

export default SearchResultsPage;