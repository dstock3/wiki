import { useEffect, useState } from 'react'
import '../../styles/EditSectionPage.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const EditSectionPage = ({ match, location, endpoint, title, csrfToken }) => {
    const [section, setSection] = useState({title: '', text: ''})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();
    
    const handleInputChange = (e, field) => {
        setSection(prevState => ({ ...prevState, [field]: e.target.value }));
    };

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

    const handleSave = () => {
        axios.put(`${endpoint}/articles/${match.params.articleid}/${match.params.sectionid}`, section, {
            headers: {
                'csrf-token': csrfToken
            }
        })
        .then(response => {
            history.push(`/${match.params.portalid}/article/${match.params.articleid}`);
        })
        .catch(error => {
            console.error("Error updating section", error);
        });
    };
    
    const handleDelete = () => {
        axios.delete(`${endpoint}/articles/${match.params.articleid}/${match.params.sectionid}`, {
            headers: {
                'csrf-token': csrfToken
            }
        })
        .then(response => {
            console.log("Section deleted successfully", response.data);
            history.push(`/${match.params.portalid}/article/${match.params.articleid}`);
        })
        .catch(error => {
            console.error("Error deleting section", error);
        });
    };

    const handleCancel = () => {
        history.push(`/${match.params.portalid}/article/${match.params.articleid}`);
    }
    
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
                            onChange={e => handleInputChange(e, 'title')}
                        />
                    </div>
                    <button className="delete-btn delete-section" onClick={handleDelete}>Delete Section</button>
                </div>
                <div className="edit-section-container">
                    <label>Section Content:</label>
                    <textarea 
                        placeholder="Section Content" 
                        value={section.text}
                        onChange={e => handleInputChange(e, 'text')}
                    />
                </div>
                <div className="edit-section-btn-container">
                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    <button className="save-btn" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
  )
}

export default EditSectionPage