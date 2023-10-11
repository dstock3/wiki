import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/EditArticlePage.css'
import EditSection from '../../components/EditSection';
import EditReferences from '../../components/EditReferences';
import EditInfoBox from '../../components/EditInfoBox';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import useArticleLinkEmbedder from '../../hooks/useArticleLinkEmbedder'
import LinkModal from '../../components/LinkModal'

const EditArticlePage = ({ match, endpoint, title, csrfToken }) => {
    const history = useHistory();
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
    const [currentSectionIndex, setCurrentSectionIndex] = useState(null);
    const {
        isModalOpen,
        articles,
        handleRightClick,
        handleModalClose,
        handleModalConfirm: handleLinkEmbed
    } = useArticleLinkEmbedder(endpoint, match.params.portalid);

    const modifiedHandleRightClick = (e, sectionIndex) => {
        if (sectionIndex !== undefined) {
            setCurrentSectionIndex(sectionIndex);
        } else {
            setCurrentSectionIndex(null);
        }
        handleRightClick(e);
    };

    const handleModalConfirm = (articleID) => {
        const {linkSyntax, selectedWord} = handleLinkEmbed(articleID);
        
        if (currentSectionIndex === null) {
            const updatedIntro = article.intro.replace(selectedWord, linkSyntax);
            setArticle(prevState => ({ ...prevState, intro: updatedIntro }));
        } else {
            const sectionsCopy = [...article.content];
            sectionsCopy[currentSectionIndex].text = sectionsCopy[currentSectionIndex].text.replace(selectedWord, linkSyntax);
            setArticle(prevState => ({ ...prevState, content: sectionsCopy }));
        }
    };

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
    
    const addInfoField = e => {
        e.preventDefault();
        setInfobox(prev => ({ ...prev, info: [...prev.info, { label: '', value: '' }] }));
    }

    const removeInfoField = (e) => {
        e.preventDefault();
        if (infobox.info.length > 0) {
            const newInfo = [...infobox.info];
            newInfo.pop();
            setInfobox(prev => ({ ...prev, info: newInfo }));
        }

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
        
        const formData = new FormData(document.getElementById('articleForm'));
        formData.append("title", article.title);
        formData.append("intro", article.intro);
        formData.append("content", JSON.stringify(article.content));  
        formData.append("infoBox", JSON.stringify(infobox));  
        formData.append("references", JSON.stringify(references));
        formData.append("portalid", match.params.portalid);
        
        const config = {
            withCredentials: true,
            headers: {
                'csrf-token': csrfToken,
                'Content-Type': 'multipart/form-data'
            }
        };

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        if (match.params.articleid) {
            axios.put(`${endpoint}/articles/${match.params.articleid}`, formData, config)
                .then(response => {
                    history.push(`/${match.params.portalid}/article/${match.params.articleid}`);
                })
                .catch(handleError);
        } else {
            axios.post(`${endpoint}/articles/`, formData, config)
                .then(response => {
                    history.push(`/${match.params.portalid}/article/${response.data._id}`);
                })
                .catch(handleError);
        }
    };
    
    const handleError = (err) => {
        if (err.response && err.response.status === 400 && err.response.data.errors) {
            const validationErrors = err.response.data.errors.map(error => error.msg).join(', ');
            setError(`Validation Error: ${validationErrors}`);
        } else {
            setError("Error processing the request.");
        }
    };

    return (
        <div className="edit-article-page">
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <Loading loading={loading} />
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
                        onContextMenu={handleRightClick}
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
                            handleRightClick={modifiedHandleRightClick}
                        />
                    ))}
                    <button className="add-section-button" onClick={addSection}>+</button>
                </div>
                <div className="info-group">
                    <EditInfoBox 
                        infobox={infobox} 
                        handleInfoboxChange={handleInfoboxChange} 
                        handleInfoboxImageChange={handleInfoboxImageChange} 
                        handleInfoboxInfoChange={handleInfoboxInfoChange} 
                        addInfoField={addInfoField}
                        removeInfoField={removeInfoField}
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
        <LinkModal isOpen={isModalOpen} articles={articles} onClose={handleModalClose} onConfirm={handleModalConfirm} />
        </div>
    );
};

export default EditArticlePage;