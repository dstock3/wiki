import React from 'react'

const EditSection = ({index, section, handleSectionChange, handleSectionDelete }) => {
  return (
    <div key={index} className="section-content">
        <div className="section-subcontainer">
            <div className="edit-section-title">
                <label>Section Title:</label>
                <input 
                    type="text" 
                    placeholder="Section Title" 
                    value={section.title}
                    onChange={(e) => handleSectionChange(index, 'title', e.target.value)} 
                />
            </div>
            <button className="delete-btn delete-section" onClick={() => handleSectionDelete(index)}>Delete Section</button>
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