import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/BlogSidebar.css'; 

const BlogSidebar = ({ links }) => {
    return (
        <div className="blog-sidebar">
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