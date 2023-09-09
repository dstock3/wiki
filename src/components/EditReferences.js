import React from 'react'

const EditReferences = ({index, reference, handleReferenceChange, handleDeleteReference }) => {
  return (
    <div key={index} className="reference">
        <label className="reference-label">Reference Content</label>
        <input 
            type="text" 
            className="reference-name"
            placeholder="Reference Name" 
            value={reference.name}
            onChange={(e) => handleReferenceChange(index, 'name', e.target.value)} 
        />
        <label className="reference-label ref-source">Reference Source</label>
        <input 
            type="text"
            className="reference-url" 
            placeholder="Reference URL" 
            value={reference.link}
            onChange={(e) => handleReferenceChange(index, 'link', e.target.value)} 
        />
        <button className="delete-btn" onClick={() => handleDeleteReference(index)}>Delete Reference</button>
    </div>
  )
}

export default EditReferences