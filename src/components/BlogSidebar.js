import React from 'react';
import { Link } from 'react-router-dom';

const BlogSidebar = ({ links }) => {
    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="blog-sidebar">
            <h4>Archive</h4>
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <Link to={link.href} onClick={() => scrollTo(link.href.substring(1))}>
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogSidebar;