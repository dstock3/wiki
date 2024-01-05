import React from 'react';
import '../styles/Article.css';
import InfoBox from './InfoBox';
import EditLink from './EditLink';
import { parseContentToComponents } from '../utils/textParsers';

const Article = ({ match, title, intro, infobox, content, references, isAuthenticated }) => {
  return (
    <article className="article-container">
      <h1 className="article-title">{title}</h1>
      <div className="article-content">
        <div className="main-container">
          {infobox && (
            <InfoBox
              title={infobox.title}
              image={infobox.image}
              info={infobox.info}
            />
          )}
          <div className="article-sections">
            <div>
              {parseContentToComponents(intro)}
            </div>
            {content.map((section, index) => {
              return (
                  <div className={`article-subcontainer ${section.image ? 'dual-section' : ''}`} key={index}>
                      <div className="article-section" id={`section-${index}`}>
                          <div className="section-head">
                              <h2>{section.title}</h2>
                              {isAuthenticated && (
                                <EditLink linkTo={`/${match.params.portalid}/article/${match.params.articleid}/${section._id}/edit`} linkClass="edit-section-link" />
                              )}
                          </div>
                          <div>
                            {parseContentToComponents(section.text)}
                          </div>
                      </div>
                      {section.image && (
                        <div className="article-section-image">
                            <img src={section.image.src} alt={section.image.alt} />

                            {section.image.alt && (
                              <div className="section-image-caption">
                                <span>{section.image.alt}</span>
                              </div>
                            )}
                        </div>
                      )}
                  </div>
              );
            })}
          </div>
        </div>

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