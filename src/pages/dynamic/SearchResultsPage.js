import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/SearchResultsPage.css';

const SearchResultsPage = ({ match, endpoint, title }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  
  useEffect(() => {
    document.title = `${title} | Search Results for ${match.params.query}`;
  }, [title, match.params.query]);
  
  useEffect(() => {
    const apiUrl = `${endpoint}/articles/search?query=${match.params.query}&page=${currentPage}&limit=${limit}`;

    axios.get(apiUrl)
      .then(response => {
        setSearchResults(response.data.articles);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching search results:", err);
        setError(err);
        setLoading(false);
      });
  }, [match.params.query, endpoint, currentPage]);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }

  if (loading) return <div className="search-results-page">Loading...</div>;
  if (error) return <div className="search-results-page">Error: {error}</div>;

  return (
    <div className="search-results-page">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading search results. Please try again.</p>
      ) : searchResults.length > 0 ? (
        <>
          {searchResults.map((result, index) => {
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
          })}
          <div className="pagination-controls">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      ) : (
        <p className="no-results">
          No results found for "{match.params.query}".
        </p>
      )}
    </div>
  );
};

export default SearchResultsPage;