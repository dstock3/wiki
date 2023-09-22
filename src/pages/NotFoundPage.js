import React, { useEffect } from 'react';

const NotFoundPage = ({ title }) => {
  useEffect(() => {
    document.title = `${title} | Page Not Found`;
  }, [title]);
  
  return (
    <div className="not-found-container">
      <h1>Oops! Page Not Found.</h1>
      <p>Sorry, the page you're looking for doesn't exist or has been moved. Double-check the URL or use the navigation to find your way back.</p>
      <div className="not-found-actions">
        <a href="/">Return to Home</a>
      </div>
    </div>
  )
}

export default NotFoundPage;
