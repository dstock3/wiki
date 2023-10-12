import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { modules, formats } from '../config/quillConfig';

const EditSection = ({quillRef, index, section, handleSectionChange, handleSectionDelete, handleRightClick }) => {
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
            <ReactQuill 
                ref={quillRef}
                value={section.text}
                modules={modules}
                formats={formats}
                onChange={(content, delta, source, editor) => handleSectionChange(index, 'text', content, editor)}
                onKeyUp={(e) => handleRightClick(e, index)}
            />
        </div>
    </div>
  )
}

export default EditSection