import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { modules, formats } from '../../config/quillConfig';
import '../../styles/EditBlogPage.css';

const EditBlogPage = ({ endpoint, csrfToken }) => {
    const { id } = useParams();
    const history = useHistory();
    const quillRef = useRef(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`${endpoint}/blogs/${id}`, { withCredentials: true })
                .then(response => {
                    const blog = response.data.blog;
                    setTitle(blog.title);
                    setBody(blog.body);
                    setIsEditing(true);
                })
                .catch(err => {
                    setError('Error fetching blog.');
                    console.error('Error fetching blog:', err);
                });
        }
    }, [id, endpoint]);

    const handleSaveClick = async (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        formData.append("_csrf", csrfToken);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        };

        try {
            let response;
            if (isEditing) {
                response = await axios.put(`${endpoint}/blogs/${id}`, formData, config);
            } else {
                response = await axios.post(`${endpoint}/blogs`, formData, config);
            }

            history.push('/wiki/admin');
        } catch (err) {
            handleError(err);
        }
    };

    const handleError = (err) => {
        if (err.response && err.response.status === 403) {
            setError('Forbidden: You do not have permission to perform this action.');
        } else if (err.response && err.response.status === 400) {
            setError('Validation Error: Please check your input.');
        } else {
            setError('Error processing the request.');
        }
        console.error('Error creating/updating blog:', err);
    };

    return (
        <div className="edit-blog-page">
            {error && <p className="error-message">{error}</p>}
            <h2>{isEditing ? 'Edit Blog' : 'Create New Blog'}</h2>
            <form onSubmit={handleSaveClick}>
                <div className="blog-page-form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </div>
                <div className="blog-page-form-group">
                    <label htmlFor="body">Body</label>
                    <ReactQuill 
                        style={{ backgroundColor: 'white' }}
                        ref={quillRef}
                        value={body}
                        modules={modules}
                        formats={formats}
                        onChange={(content, delta, source, editor) => {
                            setBody(editor.getHTML());
                        }}
                    />
                </div>
                <div className="blog-button-container">
                    <button type="submit">
                        {isEditing ? 'Save Changes' : 'Create Blog'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlogPage;