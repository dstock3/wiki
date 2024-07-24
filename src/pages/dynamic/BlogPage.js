import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';

const BlogPage = ({ match, endpoint, title }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (articleData) {
          document.title = `${title} | ${articleData.title}`;
        }
      }, [articleData]);

    if (loading) return <div className="article-page">
      <Loading loading={loading} />
    </div>;
  
    if (error) return <div className="article-page">Error: {error}</div>;

}