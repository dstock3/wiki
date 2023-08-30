import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import '../styles/SearchResultsPage.css';

const SearchResultsPage = ({ match }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch search results based on query (match.params.query)
    // currently using hardcoded data
    const fetchedData = [
      {
        title: "Sample Article 1",
        content: [
          { title: "Introduction", text: "This is an introduction." }
        ],
        references: []
      },
      {
        title: "Sample Article 2",
        content: [
          { title: "Introduction", text: "This is another introduction." }
        ],
        references: []
      }
    ];
    
    setSearchResults(fetchedData);
  }, [match.params.query]);

  return (
    <div className="search-results-page">
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <Article 
            key={index}
            title={result.title}
            content={result.content}
            references={result.references}
          />
        ))
      ) : (
        <p>No results found for "{match.params.query}".</p>
      )}
    </div>
  );
};

export default SearchResultsPage;