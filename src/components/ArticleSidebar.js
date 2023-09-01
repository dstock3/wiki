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
                        {/* need to add link to appropriate section */}
                        <li><a href="#">{section.title}</a></li>
                    </div>
                ))}
            </ul>
        )}
        {references && (
            <ul>
            {references.map((reference, index) => (
                <div key={index} className="article-section">

                    <li><a href="#">{reference.name}</a></li>
                </div>
                ))}
            </ul>
        )}
    </div>
  )
}

export default ArticleSidebar