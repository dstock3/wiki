import React from 'react';

const PortalSidebar = ({articles}) => {
  return (
    <div className="side-menu-container">
      <h3>Articles</h3>
      <ul>
        {articles.slice(0, 10).map((article, index) => (
          <li key={index}>
            <a href={article.link}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PortalSidebar;