import React from 'react';

const BlogSidebar = ({ links }) => {
    return (
        <div className="blog-sidebar">
            <h4>Archive</h4>
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <a href={link.href}>{link.text}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogSidebar;