import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditArticlePage.css'

const EditArticlePage = ({ match }) => {
    const [article, setArticle] = useState({ title: '', content: '', imageUrl: '' });
    const [originalArticle, setOriginalArticle] = useState(null);
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        if (match.params.id) {
            axios.get(`/api/${match.params.portalid}/article/${match.params.id}`)
            .then(response => {
                setArticle(response.data);
                setOriginalArticle(response.data);
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setArticle(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            }
            });
            setArticle(prev => ({ ...prev, imageUrl: response.data.url }));
        } catch (error) {
            setError("Error uploading the image.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (image) {
            await handleImageUpload();
        }

        if (match.params.id) {
            axios.put(`/api/${match.params.portalid}/article/${match.params.id}`, article)
            .then(response => {
                // success
            })
            .catch(err => {
                setError("Error updating the article.");
            });
        } else {
            axios.post(`/api/${match.params.portalid}/article`, article)
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
            <form className="edit-article-container" onSubmit={handleSubmit}>
                <div className="primary-container">
                    <div className="form-group">
                        <label>Title:</label>
                        <input 
                            type="text"
                            name="title"
                            value={article.title}
                            className="title-input"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group image-upload">
                        <label>Image:</label>
                        <input 
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Content:</label>
                    <textarea 
                        name="content"
                        value={article.content}
                        onChange={handleInputChange}
                    />
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && <p>Upload Progress: {uploadProgress}%</p>}
                <button className="edit-article-button" type="submit">Save Changes</button>
            </form>
            )}
        </div>
    );
};

export default EditArticlePage;