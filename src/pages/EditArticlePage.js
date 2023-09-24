import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditArticlePage.css'
import EditSection from '../components/EditSection';
import EditReferences from '../components/EditReferences';
import EditInfoBox from '../components/EditInfoBox';

const EditArticlePage = ({ match, endpoint, title }) => {
    const [article, setArticle] = useState({
        title: '',
        intro: '',
        content: []
    });
    
    const [infobox, setInfobox] = useState({
        title: '',
        image: { src: '', alt: '' },
        info: []
    });
    const [references, setReferences] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        document.title = `${title} | Edit Article`;
    }, [title]);

    useEffect(() => {
        if (match.params.articleid) {
            axios.get(`${endpoint}/articles/${match.params.articleid}`)
            .then(response => {
                if (response.data.infoBox) {
                    setInfobox(response.data.infoBox);
                }
                if (response.data.references) {
                    setReferences(response.data.references);
                }
                setArticle(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Error fetching the article.");
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
        
    }, [match.params.articleid, endpoint]);

    const addSection = e => {
        e.preventDefault();
        setArticle(prev => ({
            ...prev,
            content: [...prev.content, { title: '', text: '' }]
        }));
    };

    const addReference = e => {
        e.preventDefault();
        setReferences(prev => [...prev, { name: '', link: '' }]);
    };

    const handleReferenceChange = (index, field, value) => {
        const newReferences = [...references];
        newReferences[index][field] = value;
        setReferences(newReferences);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setArticle(prev => ({ ...prev, [name]: value }));
    };

    const handleInfoboxChange = (field, value) => {
        setInfobox(prev => ({ ...prev, [field]: value }));
    }
    
    const handleInfoboxImageChange = (field, value) => {
        setInfobox(prev => ({ ...prev, image: { ...prev.image, [field]: value } }));
    }
    
    const handleInfoboxInfoChange = (index, field, value) => {
        const newInfo = [...infobox.info];
    
        if (field === "header") {
            if (value) {
                newInfo[index] = { label: newInfo[index].label, header: true };
            } else {
                newInfo[index] = { label: newInfo[index].label };
            }
        } else {
            newInfo[index][field] = value;
        }
    
        setInfobox({ ...infobox, info: newInfo });
    };
    const handleInfoboxImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // preview the image on client side:
            const localUrl = URL.createObjectURL(file);
            setInfobox(prev => ({ ...prev, image: { ...prev.image, src: localUrl } }));
            

            const formData = new FormData();
            formData.append("image", file);
            
            axios.post('/api/upload', formData, {
                onUploadProgress: progressEvent => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            })
            .then(response => {
                // success
                const serverUrl = response.data.url;
                setInfobox(prev => ({ ...prev, image: { ...prev.image, src: serverUrl } }));
            })
            .catch(err => {
                setError("Error uploading the image.");
            });
        }
    };
    
    const addInfoField = e => {
        e.preventDefault();
        setInfobox(prev => ({ ...prev, info: [...prev.info, { label: '', value: '' }] }));
    }

    const handleContentChange = (index, field, value) => {
        const newContent = [...article.content];
        newContent[index][field] = value;
        setArticle(prev => ({ ...prev, content: newContent }));
    };

    const handleSectionDelete = (indexToDelete) => {
        const newContent = [...article.content].filter((_, index) => index !== indexToDelete);
        setArticle(prev => ({ ...prev, content: newContent }));
    };
    

    const handleDeleteReference = (indexToDelete) => {
        const newReferences = references.filter((_, index) => index !== indexToDelete);
        setReferences(newReferences);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const modifiedContent = [...article.content];
        if (modifiedContent[0]) {
            modifiedContent[0].info = infobox;
        }
    
        const completeArticleData = {
            ...article,
            content: modifiedContent,   
            references: references,
            portalid: match.params.portalid
        };

        const config = {
            withCredentials: true
        };
        
        if (match.params.id) {
            axios.put(`${endpoint}/articles/${match.params.articleid}`, completeArticleData, config)
                .then(response => {
                    window.location.href = `/${match.params.portalid}/article/${match.params.articleid}`;
                })
                .catch(err => {
                    setError("Error updating the article.");
                });
        } else {
            axios.post(`${endpoint}/articles/`, completeArticleData, config)
                .then(response => {
                    window.location.href = `/${match.params.portalid}/article/${response.data._id}`;
                })
                .catch(err => {
                    setError("Error creating the article.");
                });
        }
    };

    return (
        <div className="edit-article-page">
            {error && <p className="error-message">{error}</p>}
            {loading ? (
            <p>Loading...</p>
            ) : (
            <form className="edit-article-container" id="articleForm" onSubmit={handleSubmit}>
                <div className="main-form-group">
                    <label className="main-label">Article Title:</label>
                    <input 
                        type="text"
                        name="title"
                        value={article.title}
                        className="title-input"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label className="main-label">Article Introduction:</label>
                    <textarea 
                        name="intro"
                        value={article.intro}
                        className="introduction-input"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label className="main-label">Article Section:</label>
                    {Array.isArray(article.content) && article.content.map((section, index) => (
                        <EditSection 
                            index={index} 
                            section={section} 
                            handleSectionChange={handleContentChange}
                            handleSectionDelete={handleSectionDelete}
                        />
                    ))}
                    <button className="add-section-button" onClick={addSection}>+</button>
                </div>
                <div className="info-group">
                    <EditInfoBox 
                        infobox={infobox} 
                        handleInfoboxChange={handleInfoboxChange} 
                        handleInfoboxImageUpload={handleInfoboxImageUpload} 
                        handleInfoboxImageChange={handleInfoboxImageChange} 
                        handleInfoboxInfoChange={handleInfoboxInfoChange} 
                        addInfoField={addInfoField} 
                    />

                    <div className="ref-group">
                        <label className="main-label">Article References:</label>
                        {references.map((ref, index) => (
                            <EditReferences index={index} reference={ref} handleReferenceChange={handleReferenceChange} handleDeleteReference={handleDeleteReference}  />
                        ))}
                        <button className="add-reference-button" onClick={addReference}>+</button>
                    </div>
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && <p>Upload Progress: {uploadProgress}%</p>}
                
                <button className="edit-article-button" type="submit">Save Changes</button>
            </form>
            )}
        </div>
    );
};

export default EditArticlePage;