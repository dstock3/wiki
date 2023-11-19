import React from 'react'
import '../styles/SideMenu.css'

const ArticleSidebar = ({intro, content}) => {
    return (
      <div className="side-menu-container article-sidebar-container">
        <h3>Contents</h3>
  
        {content && (
            <ul>
                {intro && (
                    <li className="article-section">
                        <span>{'> '}</span>
                        <a href="#intro">Introduction</a>
                    </li>
                )}
                {content.map((section, index) => (
                    <li key={index} className="article-section">
                        <span>{'> '}</span>
                        <a href={`#section-${index}`}>
                            {section.title}
                        </a>
                    </li>
                ))}
            </ul>
        )}
      </div>
    )
}

export default ArticleSidebar