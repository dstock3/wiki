import React from 'react'

const EditSection = ({index, section, handleSectionChange, }) => {
  return (
    <div key={index} className="section-content">
        <div className="edit-section-title">
            <label>Section Title:</label>
            <input 
                type="text" 
                placeholder="Section Title" 
                value={section.title}
                onChange={(e) => handleSectionChange(index, 'title', e.target.value)} 
            />
        </div>
        <div className="edit-section-container">
            <label>Section Content:</label>
            <textarea 
                placeholder="Section Content" 
                value={section.text}
                onChange={(e) => handleSectionChange(index, 'content', e.target.value)} 
            />
        </div>
    </div>
  )
}

export default EditSection