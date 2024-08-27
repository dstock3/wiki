import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { modules, formats } from '../../config/quillConfig';
import '../../styles/EditBlogPage.css';

const EditBlogPage = ({ match, title, endpoint, csrfToken }) => {
    const history = useHistory();
    const quillRef = useRef(null);
    const [blogTitle, setBlogTitle] = useState('');
    const [body, setBody] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = `${title} | ${match.params.blogid ? 'Edit Blog' : 'Create Blog'}`;
    }, [title, match.params.blogid]);

    useEffect(() => {
        if (match.params.blogid) {
            axios.get(`${endpoint}/blogs/${match.params.blogid}`, { withCredentials: true })
                .then(response => {
                    const blog = response.data.blog;
                    setBlogTitle(blog.title);
                    setBody(blog.body);
                    setIsEditing(true);
                })
                .catch(err => {
                    setError('Error fetching blog.');
                    console.error('Error fetching blog:', err);
                });
        } else {
            setBlogTitle('');
            setBody('');
            setIsEditing(false);
        }
    }, [match.params.blogid, endpoint]);

    const handleSaveClick = async (event) => {
        event.preventDefault();
    
        const blog = {
            title: blogTitle,
            body: body,
            _csrf: csrfToken
        };
    
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
    
        try {
            let response;
            if (isEditing) {
                response = await axios.put(`${endpoint}/blogs/${match.params.blogid}`, blog, config);
            } else {
                response = await axios.post(`${endpoint}/blogs`, blog, config);
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
                        value={blogTitle} 
                        onChange={(e) => setBlogTitle(e.target.value)} 
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
