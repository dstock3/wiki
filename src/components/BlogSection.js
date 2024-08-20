import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const BlogSection = ({ endpoint, csrfToken }) => {
    const [blogs, setBlogs] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${endpoint}/blogs`, { withCredentials: true });
                setBlogs(response.data.blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, [endpoint]);

    const handleEditClick = (id) => {
        history.push(`/wiki/edit-blog/${id}`);
    };

    const handleCreateClick = () => {
        history.push('/wiki/create-blog');
    };

    const handleDeleteClick = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };

            await axios.delete(`${endpoint}/blogs/${id}`, {
                data: { _csrf: csrfToken },
                ...config,
            });

            setBlogs(blogs.filter(blog => blog._id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const getPreviewText = (text, charLimit = 100) => {
        const plainText = text.replace(/<[^>]+>/g, ''); // Remove HTML tags
        if (plainText.length <= charLimit) return plainText;
        return `${plainText.substring(0, charLimit)}...`;
    };

    return (
        <section className="blog-section">
            <h2 className="blog-head">Blog Management</h2>
            <button className="blog-create-button" onClick={handleCreateClick}>Create New Blog</button>
            <ul className="blog-list">
                {blogs.map(blog => (
                    <li key={blog._id} className="blog-item">
                        <div className="blog-info-container">
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-date">Posted on: {new Date(blog.postedDate).toLocaleDateString()}</p>
                            <p className="blog-preview" dangerouslySetInnerHTML={{ __html: getPreviewText(blog.body) }}></p>
                            <div className="blog-action-buttons">
                                <button className="blog-edit-button" onClick={() => handleEditClick(blog._id)}>Edit</button>
                                <button className="blog-delete-button" onClick={() => handleDeleteClick(blog._id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default BlogSection;


