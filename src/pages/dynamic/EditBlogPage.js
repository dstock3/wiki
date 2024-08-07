import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { modules, formats } from '../../config/quillConfig';
import '../../styles/EditBlogPage.css';

const EditBlogPage = ({ endpoint }) => {
    const { id } = useParams();
    const history = useHistory();
    const quillRef = useRef(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            axios.get(`${endpoint}/blogs/${id}`)
                .then(response => {
                    const blog = response.data.blog;
                    setTitle(blog.title);
                    setBody(blog.body);
                    setIsEditing(true);
                })
                .catch(err => {
                    console.error('Error fetching blog:', err);
                });
        }
    }, [id, endpoint]);

    const handleSaveClick = () => {
        const blog = { title, body };

        if (isEditing) {
            axios.put(`${endpoint}/blogs/${id}`, blog)
                .then(() => {
                    history.push('/wiki/admin');
                })
                .catch(err => {
                    console.error('Error updating blog:', err);
                });
        } else {
            axios.post(`${endpoint}/blogs`, blog)
                .then(() => {
                    history.push('/wiki/admin');
                })
                .catch(err => {
                    console.error('Error creating blog:', err);
                });
        }
    };

    return (
        <div className="edit-blog-page">
            <h2>{isEditing ? 'Edit Blog' : 'Create New Blog'}</h2>
            <form>
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
                    <button type="button" onClick={handleSaveClick}>
                        {isEditing ? 'Save Changes' : 'Create Blog'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlogPage;
