import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const sampleBlogs = [
            { id: 1, title: 'Sample Blog 1', postedDate: '2024-07-29T00:00:00Z', body: 'This is the body of sample blog 1. It contains some text to show how the blog content will be displayed.' },
            { id: 2, title: 'Sample Blog 2', postedDate: '2024-07-30T00:00:00Z', body: 'This is the body of sample blog 2. It contains some text to show how the blog content will be displayed.' },
        ];
        setBlogs(sampleBlogs);
    }, []);

    const handleEditClick = (id) => {
        history.push(`/wiki/edit-blog/${id}`);
    };

    const handleCreateClick = () => {
        history.push('/wiki/create-blog');
    };

    const handleDeleteClick = (id) => {
        setBlogs(blogs.filter(blog => blog.id !== id));
    };

    const getPreviewText = (text, charLimit = 100) => {
        if (text.length <= charLimit) return text;
        return `${text.substring(0, charLimit)}...`;
    };

    return (
        <section className="blog-section">
            <h2 className="blog-head">Blog Management</h2>
            <button className="blog-create-button" onClick={handleCreateClick}>Create New Blog</button>
            <ul className="blog-list">
                {blogs.map(blog => (
                    <li key={blog.id} className="blog-item">
                        <div className="blog-info-container">
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-date">Posted on: {new Date(blog.postedDate).toLocaleDateString()}</p>
                            <p className="blog-preview">{getPreviewText(blog.body)}</p>
                            <div className="blog-action-buttons">
                                <button className="blog-edit-button" onClick={() => handleEditClick(blog.id)}>Edit</button>
                                <button className="blog-delete-button" onClick={() => handleDeleteClick(blog.id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default BlogSection;
