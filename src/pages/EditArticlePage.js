import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditArticlePage.css'
import EditSection from '../components/EditSection';
import EditReferences from '../components/EditReferences';
import EditInfoBox from '../components/EditInfoBox';

const EditArticlePage = ({ match, endpoint }) => {
    const [article, setArticle] = useState({ title: '', content: '', imageUrl: '' });
    const [sections, setSections] = useState([]);
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
        document.title = `WikiWise | Edit Article`;
    }, []);

    useEffect(() => {
        const sampleArticle = {
            title: "Peregrine Falcon",
            content: [
                {
                    title: "Introduction",
                    text: "The peregrine falcon, also known as the peregrine, and historically as the duck hawk in North America, is a widespread bird of prey in the family Falconidae.",
                    info: {
                        title: "Peregrine Falcon",
                        image: {
                            alt: "Peregrine Falcon Image",
                            src: "http://via.placeholder.com/350x250"
                        },
                        info: [
                            { label: "Kingdom", value: "Animalia" },
                            { label: "Phylum", value: "Chordata" },
                            { label: "Class", header: true },
                            { label: "Order", value: "Falconiformes" },
                            { label: "Genus", value: "Falco" },
                            { label: "Average Speed", value: "240 km/h" },
                        ]
                    }
                },
                {
                    title: "Habitat and Distribution",
                    text: "Peregrine falcons are among the world's most common birds of prey and live on all continents except Antarctica. They prefer wide-open spaces, and thrive near coasts where shorebirds are common, but they can be found everywhere from tundra to deserts.",
                },
                {
                    title: "Diet",
                    text: "The peregrine falcon feeds almost exclusively on medium-sized birds such as pigeons and doves, waterfowl, songbirds, and waders."
                },
            ],
            references: [
                { name: "National Geographic - Peregrine Falcon", link: "https://www.nationalgeographic.com" },
                { name: "Wikipedia - Peregrine Falcon", link: "https://en.wikipedia.org/wiki/Peregrine_falcon" }
            ]
        }
        setArticle(sampleArticle);

        if (sampleArticle.content && sampleArticle.content[0] && sampleArticle.content[0].info) {
            setInfobox(sampleArticle.content[0].info);
        }
        
        if (sampleArticle.references) {
            setReferences(sampleArticle.references);
        }
    }, [])

    useEffect(() => {
        if (match.params.id) {
            axios.get(`${endpoint}/${match.params.portalid}/article/${match.params.id}`)
            .then(response => {
                if (article.infobox) {
                    setInfobox(article.infobox);
                }
    
                if (article.references) {
                    setReferences(article.references);
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
    }, [match.params.portalid, match.params.id]);

    const addSection = e => {
        e.preventDefault();
        setSections(prev => [...prev, { title: '', content: '' }]);
    }
    
    const addReference = e => {
        e.preventDefault();
        setReferences(prev => [...prev, { name: '', link: '' }]);
    }

    const handleSectionChange = (index, field, value) => {
        const newSections = [...sections];
        newSections[index][field] = value;
        setSections(newSections);
    }
    
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

    const handleDeleteReference = (indexToDelete) => {
        const newReferences = references.filter((_, index) => index !== indexToDelete);
        setReferences(newReferences);
    }

    const handleSectionDelete = (indexToDelete) => {
        const newSections = sections.filter((_, index) => index !== indexToDelete);
        setSections(newSections);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const completeArticleData = {
            ...article,
            sections: sections,
            references: references,
            infobox: infobox
        };
    
        if (match.params.id) {
            axios.put(`/api/${match.params.portalid}/article/${match.params.id}`, completeArticleData)
            .then(response => {
                // success
            })
            .catch(err => {
                setError("Error updating the article.");
            });
        } else {

            axios.post(`/api/${match.params.portalid}/article`, completeArticleData)
            .then(response => {
                // success
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
                    <label className="main-label">Article Content:</label>
                    {article.content.map((section, index) => (
                        <EditSection index={index} section={section} handleSectionChange={handleContentChange} handleSectionDelete={handleSectionDelete} />
                    ))}
                    {sections.length > 0 && sections.map((section, index) => (
                        <EditSection index={index} section={section} handleSectionChange={handleSectionChange} handleSectionDelete={handleSectionDelete} />
                    ))}
                    <button className="add-section-button" onClick={addSection}>+</button>
                </div>
                <div className="info-group">
                    <EditInfoBox infobox={infobox} handleInfoboxChange={handleInfoboxChange} handleInfoboxImageUpload={handleInfoboxImageUpload} handleInfoboxImageChange={handleInfoboxImageChange} handleInfoboxInfoChange={handleInfoboxInfoChange} addInfoField={addInfoField} />

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