import React from 'react'

const EditReferences = ({index, reference, handleReferenceChange}) => {
  return (
    <div key={index} className="reference">
        <input 
            type="text" 
            placeholder="Reference Name" 
            value={reference.name}
            onChange={(e) => handleReferenceChange(index, 'name', e.target.value)} 
        />
        <input 
            type="text" 
            placeholder="Reference URL" 
            value={reference.link}
            onChange={(e) => handleReferenceChange(index, 'link', e.target.value)} 
        />
    </div>
  )
}

export default EditReferences