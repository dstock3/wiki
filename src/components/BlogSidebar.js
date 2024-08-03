import React from 'react';
import { Link } from 'react-router-dom';

const BlogSidebar = ({ links }) => {
    return (
        <div className="blog-sidebar">
            <h4>Archive</h4>
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <Link to={link.href}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogSidebar;