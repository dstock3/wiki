import { useEffect, useState } from 'react'
import '../../styles/EditSectionPage.css'

const EditSectionPage = ({ match, location, endpoint, title, csrfToken }) => {
    const [section, setSection] = useState({title: '', text: ''})

    useEffect(() => {
        // Get section data from endpoint
        // Set section state
        setSection({
            title: 'Section Title',
            text: 'Section Text'
        })
    }, [match.params.sectionid])

    return (
    <div className="edit-section-page">
        <div className="section-content">
            <div className="section-subcontainer">
                <div className="edit-section-title">
                    <label>Section Title:</label>
                    <input 
                        type="text" 
                        placeholder="Section Title" 
                        value={section.title}
                    />
                </div>
                <button className="delete-btn delete-section">Delete Section</button>
            </div>
            <div className="edit-section-container">
                <label>Section Content:</label>
                <textarea 
                    placeholder="Section Content" 
                    value={section.text}
                />
            </div>
            <div className="edit-section-btn-container">
                <button className="cancel-btn">Cancel</button>
                <button className="save-btn">Save</button>
            </div>
        </div>
    </div>
  )
}

export default EditSectionPage