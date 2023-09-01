import React from 'react'
import '../styles/SideMenu.css'
import '../styles/ArticleSidebar.css'

const ArticleSidebar = ({title, content}) => {
  return (
    <div className="side-menu-container">
        {/* need to iterate throught articleData and enable nav capabilities by section */}
        {title && (
            <h3>{title}</h3>
        )}
        {content && (
            <ul>
                {content.map((section, index) => (
                    <div key={index} className="article-section">
                        {/* need to add link to appropriate section */}
                        <li><a href="#">{section.title}</a></li>
                    </div>
                ))}
            </ul>
        )}
    </div>
  )
}

export default ArticleSidebar