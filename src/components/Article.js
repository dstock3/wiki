import React from 'react';
import '../styles/Article.css';
import InfoBox from './InfoBox';
import { Link } from 'react-router-dom';
import { parseContentToHTML } from '../utils/textParsers';

const Article = ({ match, title, intro, infobox, content, references, isAuthenticated }) => {

  return (
    <article className="article-container">
      <h1 className="article-title">{title}</h1>
      <div className="article-content">
        <div className="intro-container">
          <div className="article-intro" id="intro">
           <div dangerouslySetInnerHTML={{ __html: parseContentToHTML(intro) }} />
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
                      <div dangerouslySetInnerHTML={{ __html: parseContentToHTML(section.text) }} />
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
            <li key={index} className="reference-list-item">
              <span>{index + 1}. </span>
              <a 
                href={ref.link.startsWith('http://') || ref.link.startsWith('https://') ? ref.link : `http://${ref.link}`} 
                target="_blank" 
                rel="noopener noreferrer"
                id={`reference-${index + 1}`}>
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