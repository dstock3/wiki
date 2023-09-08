import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchResultsPage.css';

const SearchResultsPage = ({ match }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const sampleData = [
    {
      title: "The Wonders of Space",
      excerpt: "Space, the final frontier. Discover the mysteries of the universe, from galaxies and stars to planets and their moons.",
      image: {
        source: "https://via.placeholder.com/150x150?text=Space",
        alt: "Image representing space with stars and galaxies"
      }
    },
    {
      title: "Deep Ocean Exploration",
      excerpt: "Venture into the depths of the Earth's oceans. Learn about mysterious creatures that reside in the darkest corners.",
      image: {
        source: "https://via.placeholder.com/150x150?text=Ocean",
        alt: "Image representing the ocean with shades of blue"
      }
    },
    {
      title: "The History of Computers",
      excerpt: "From giant mainframes to the smartphone in your pocket, explore the evolution of computers through time.",
      image: {
        source: "https://via.placeholder.com/150x150?text=Computer",
        alt: "Image representing a computer"
      }
    },
    {
      title: "Mysteries of the Human Mind",
      excerpt: "Dive deep into the complexities of the human brain and explore consciousness, emotions, and thought processes.",
      image: {
        source: "https://via.placeholder.com/150x150?text=Brain",
        alt: "Image representing a stylized human brain"
      }
    }
  ];

  useEffect(() => {
    // assuming the api endpoint is something like this:
    /*
    const apiUrl = `https://your-api-url.com/search?query=${match.params.query}`;

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
      */
      setSearchResults(sampleData);
      setLoading(false);
  }, [match.params.query]);

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