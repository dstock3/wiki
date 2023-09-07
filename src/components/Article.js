import React from 'react';
import '../styles/Article.css';
import InfoBox from './InfoBox';

const Article = ({ title, content, references }) => {
  return (
    <article className="article-container">
      <h1 className="article-title">{title}</h1>
      <div className="article-content">
        {content.map((section, index) => (
          <React.Fragment key={index}>
            <div className="article-section" id={`section-${index}`}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>

            {section.info ? (
              <InfoBox
                title={section.info.title}
                image={section.info.image}
                info={section.info.info}
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <div className="article-references">
        <h3>References</h3>
        <ul>
          {references.map((ref, index) => (
            <li key={index} id={`reference-${index}`}>
              <a href={ref.link}>
                {ref.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Article;