import { useEffect, useState } from 'react'
import '../../styles/EditSectionPage.css'
import axios from 'axios'

const EditSectionPage = ({ match, location, endpoint, title, csrfToken }) => {
    const [section, setSection] = useState({title: '', text: ''})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${endpoint}/articles/${match.params.articleid}/${match.params.sectionid}`)
        .then(response => {
            setSection(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });

        setSection({
            title: 'Section Title',
            text: 'Section Text'
        })
    }, [match.params.sectionid])

    if (loading) return <div className="edit-section-page">Loading...</div>;
    if (error) return <div className="edit-section-page">Error: {error}</div>;

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