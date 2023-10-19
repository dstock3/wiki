import React from 'react'
import '../styles/SideMenu.css'

const TalkPageSidebar = ({topics}) => {
    return (
        <div className="side-menu-container">
            <h3>Contents</h3>
    
            {topics && (
                <ul>
                    {topics.map((topic, index) => (
                        <div key={index} className="discussions-nav">
                            <li>{'> '}<a href={`#topic-${index}`}>{topic.title}</a></li>
                        </div>
                    ))}
                </ul>
            )}

        </div>
      )
}

export default TalkPageSidebar