import { useEffect, useState } from 'react';
import '../../styles/EditSectionPage.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import ReactQuill from 'react-quill';
import useArticles from '../../hooks/useArticles';
import { modules, formats } from '../../config/quillConfig';

const EditSectionPage = ({ match, endpoint, title, csrfToken }) => {
    const [section, setSection] = useState({
        title: '',
        text: '',
        sectionImage: null,
        sectionImageFile: null
    });
    const [imageAlt, setImageAlt] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { articles } = useArticles(match.params.portalid, endpoint);
    const [imageAlignment, setImageAlignment] = useState('left');
    const history = useHistory();

    useEffect(() => {
        document.title = `${title} | Edit Section`;
    }, [title]);

    const handleImageAlignmentChange = (e) => {
        setImageAlignment(e.target.value);
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${endpoint}/articles/${match.params.articleid}/${match.params.sectionid}`, { withCredentials: true })
        .then(response => {
            setSection(response.data);
            setImageAlt(response.data.image ? response.data.image.alt : '');
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, [match.params.articleid, match.params.sectionid, endpoint, title]);

    const handleInputChange = (e, field) => {
        setSection(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const handleImageSelection = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSection(prevSection => ({
                    ...prevSection,
                    sectionImage: reader.result,
                    sectionImageFile: file
                }));
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select an image file.");
        }
    };

    const handleSave = async () => {
        setLoading(true);
        let formData = new FormData();
        formData.append("title", section.title);
        formData.append("text", section.text);
        formData.append("_csrf", csrfToken);
        if (section.sectionImageFile) {
            formData.append("image", section.sectionImageFile);
        }
        formData.append("imageAlt", imageAlt);
        formData.append("imageAlignment", imageAlignment);
    
        try {
            await axios.put(`${endpoint}/articles/${match.params.articleid}/${match.params.sectionid}`, formData, {
                withCredentials: true,
            });
            history.push(`/wiki/${match.params.portalid}/article/${match.params.articleid}`);
        } catch (error) {
            console.error("Error updating section", error);
            setError(error.message || "Error updating section");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this section? This action cannot be undone.");
        if (confirmDelete) {
            setLoading(true);
            axios.delete(`${endpoint}/articles/${match.params.articleid}/${match.params.sectionid}?_csrf=${encodeURIComponent(csrfToken)}`, {
                withCredentials: true,
            })
            .then(response => {
                history.push(`/wiki/${match.params.portalid}/article/${match.params.articleid}`);
            })
            .catch(error => {
                console.error("Error deleting section", error);
                setError(error.message || "Error deleting section");
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    const handleCancel = () => {
        history.push(`/wiki/${match.params.portalid}/article/${match.params.articleid}`);
    }

    if (loading) return <div className="edit-section-page"><Loading loading={loading} /></div>;
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
                    <div className="img-upload">
                        <label>Upload Image:</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageSelection}
                        />
                    </div>
                    <div className="img-alignment">
                        <label>Image Alignment:</label>
                        <select value={imageAlignment} onChange={handleImageAlignmentChange}>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                </div>
                {section.sectionImage && (
                    <>
                        <img className="section-image-preview" src={section.sectionImage} alt="Preview" />
                        <div className="img-alt-container">
                            <label>Image Alt Text:</label>
                            <input 
                                type="text" 
                                placeholder="Describe the image briefly" 
                                value={imageAlt}
                                onChange={e => setImageAlt(e.target.value)}
                            />
                        </div>
                    </>
                )}
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
    );
};

export default EditSectionPage;

