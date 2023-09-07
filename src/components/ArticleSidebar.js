import React from 'react'
import '../styles/SideMenu.css'

const ArticleSidebar = ({content, references}) => {
    return (
      <div className="side-menu-container">
          <h3>Contents</h3>
  
          {content && (
              <ul>
                  {content.map((section, index) => (
                      <div key={index} className="article-section">
                        <li>
                            <span>{'> '}</span>
                            <a href={`#section-${index}`}>
                                {section.title}
                            </a>
                        </li>
                      </div>
                  ))}
              </ul>
          )}
          
          {references && (
              <ul>
              {references.map((reference, index) => (
                  <div key={index} className="article-section">
                    <li>
                        <a href={`#reference-${index}`}>
                            {reference.name}
                        </a>
                    </li>
                  </div>
                  ))}
              </ul>
          )}
      </div>
    )
}

export default ArticleSidebar