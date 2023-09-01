import React from 'react'
import '../styles/SideMenu.css'

const TalkPageSidebar = ({discussions}) => {
    return (
        <div className="side-menu-container">
            <h3>Contents</h3>
    
            {discussions && (
                <ul>
                    {discussions.map((discussion, index) => (
                        <div key={index} className="discussions-nav">
                            <li><a href="#">{discussion.topic}</a></li>
                        </div>
                    ))}
                </ul>
            )}

        </div>
      )
}

export default TalkPageSidebar