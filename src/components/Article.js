import React from 'react';
import '../styles/Article.css';

const Article = ({ title, content, references }) => {
  return (
    <div className="article-container">
      <h1 className="article-title">{title}</h1>
      <article className="article-content">
        {content.map((section, index) => (
          <div key={index} className="article-section">
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </div>
        ))}
      </article>
      <div className="article-references">
        <h3>References</h3>
        <ul>
          {references.map((ref, index) => (
            <li key={index}><a href={ref.link}>{ref.name}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Article;