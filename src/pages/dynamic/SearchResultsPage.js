import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/SearchResultsPage.css';

const SearchResultsPage = ({ match, endpoint, title }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    document.title = `${title} | Search Results for ${match.params.query}`;
  }, [title, match.params.query]);
  
  useEffect(() => {
    const apiUrl = `${endpoint}/search?query=${match.params.query}`;

    axios.get(apiUrl)
      .then(response => {
        setSearchResults(response.data); // need to update based on API response structure
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching search results:", err);
        setError(err);
        setLoading(false);
      });
      
      setLoading(false);
  }, [match.params.query, endpoint]);

  if (loading) return <div className="search-results-page">Loading...</div>;
  if (error) return <div className="search-results-page">Error: {error}</div>;

  return (
    <div className="search-results-page">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading search results. Please try again.</p>
      ) : searchResults.length > 0 ? (
        searchResults.map((result, index) => {
          const { title, excerpt, image = {} } = result;
          const { source = "https://via.placeholder.com/150", alt = "Article Image" } = image;

          return (
            <div key={index} className="search-result">
              <div className="search-result-image-container">
                <img src={source} alt={alt} />
              </div>
              <div className="search-result-container">
                <h2><Link to={`/${match.params.portalid}/article/${title}`}>{title}</Link></h2>
                <p>{excerpt}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="no-results">
          No results found for "{match.params.query}".
        </p>
      )}
    </div>
  );
};

export default SearchResultsPage;