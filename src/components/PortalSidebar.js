import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const PortalSidebar = ({articles, portalId}) => {
  return (
    <div className="portal-side-menu side-menu-container">
      <h3>Articles</h3>
      {articles.length === 0 && <p className="no-articles-found-msg">No articles found.</p>}
      <ul>
        {articles && articles.slice(0, 10).map((article, index) => (
          <li key={index}>
            <Link to={`/${portalId}/article/${article._id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PortalSidebar;