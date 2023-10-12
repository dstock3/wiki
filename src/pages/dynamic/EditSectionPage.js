import { useEffect, useState } from 'react'
import '../../styles/EditSectionPage.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Loading from '../../components/Loading'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  
import { modules, formats } from '../../config/quillConfig';

const EditSectionPage = ({ match, endpoint, title, csrfToken }) => {
    const [section, setSection] = useState({title: '', text: ''})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        document.title = `${title} | Edit Section`;
    }, [title]);
    

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
        const config = {
            withCredentials: true,
            headers: {
                'csrf-token': csrfToken
            }
        }
        axios.put(`${endpoint}/articles/${match.params.articleid}/${match.params.sectionid}`, section, config)
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

    const handleImageUpload = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSection(prevData => ({
                    ...prevData,
                    sectionImage: reader.result,
                    sectionImageFile: file
                }));
            }
            reader.readAsDataURL(file);
        }
    }
    
    if (loading) return <div className="edit-section-page">
        <Loading loading={loading} />
    </div>;
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
                <div className="img-upload-container">
                        <label className="portal-main-label">Upload Image:</label>
                        <input 
                            type="file" 
                            name="portalImageFile" 
                            onChange={handleImageUpload}
                        />
                </div>
                <div className="edit-section-container">
                    <ReactQuill
                        style={{ backgroundColor: 'white' }}
                        value={section.text}
                        onChange={(content, delta, source, editor) => setSection(prev => ({ ...prev, text: editor.getHTML() }))}
                        modules={modules}
                        formats={formats}
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