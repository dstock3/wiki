import React from 'react';
import '../styles/Article.css';
import InfoBox from './InfoBox';
import { Link } from 'react-router-dom';
import {parseArticleLinksToJSX} from '../utils/textParsers';

const Article = ({ match, title, intro, infobox, content, references, isAuthenticated }) => {
  const parsedIntro = parseArticleLinksToJSX(intro);


  return (
    <article className="article-container">
      <h1 className="article-title">{title}</h1>
      <div className="article-content">
        <div className="intro-container">
          <div className="article-intro" id="intro">
            {parsedIntro.map((item, idx) => (
                <span key={idx}>
                    {item}
                </span>
            ))}
          </div>
          {infobox && (
            <InfoBox
              title={infobox.title}
              image={infobox.image}
              info={infobox.info}
            />
          )}
        </div>
        {content.map((section, index) => {
          const parsedSectionText = parseArticleLinksToJSX(section.text);
          return (
              <div className={`article-subcontainer ${section.image ? 'dual-section' : ''}`} key={index}>
                  <div className="article-section" id={`section-${index}`}>
                      <div className="section-head">
                          <h2>{section.title}</h2>
                          {isAuthenticated && (
                            <span>[ 
                              <Link to={`/${match.params.portalid}/article/${match.params.articleid}/${section._id}/edit`} className="edit-section-link">
                                  Edit
                              </Link>
                            ]</span>
                          )}
                      </div>
                      <p>
                          {parsedSectionText.map((item, idx) => (
                              <span key={idx}>
                                  {item}
                              </span>
                          ))}
                      </p>
                  </div>
                  {section.image && (
                    <div className="article-section-image">
                        <img src={section.image.src} alt={section.image.alt} />
                    </div>
                  )}
              </div>
          );
        })}
      </div>
      <div className="article-references">
        <h3>References</h3>
        <ul>
          {references.map((ref, index) => (
            <li key={index} id={`reference-${index}`}>
              <span>{index + 1}. </span>
              <a href={ref.link} target="_blank" rel="noopener noreferrer">
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