import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideMenu from '../../components/SideMenu';
import Loading from '../../components/Loading';
import BlogSidebar from '../../components/BlogSidebar';
import '../../styles/BlogPage.css';
import upArrow from '../../assets/up.svg';

const BlogPage = ({ endpoint }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [links, setLinks] = useState([]);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 75) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${endpoint}/blogs`);
                const data = await response.data;
                const sortedBlogs = data.blogs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
                setBlogs(sortedBlogs);
                
                const generatedLinks = sortedBlogs.map(blog => ({
                    href: `#blog-${blog._id}`,
                    text: blog.title
                }));
                setLinks(generatedLinks);
                
                if (sortedBlogs.length > 0) {
                    document.title = `${sortedBlogs[0].title} | Blog`; 
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [endpoint]);

    if (loading) return (
        <div className="blog-page">
            <Loading loading={loading} />
        </div>
    );

    if (error) return (
        <div className="blog-page">
            Error: {error}
        </div>
    );

    return (
        <div className="blog-page">
            <SideMenu />
            <main className="blog-page-container">
                <div className="blog-subcontainer">
                    {blogs.map(blog => (
                        <div key={blog._id} id={`blog-${blog._id}`} className="blog-content">
                            <h1>{blog.title}</h1>
                            <p>Posted on: {new Date(blog.postedDate).toLocaleDateString()}</p>
                            <div className="blog-body" dangerouslySetInnerHTML={{ __html: blog.body }} />
                        </div>
                    ))}
                </div>

                {links && links.length > 0 && (
                    <BlogSidebar links={links} />
                )}
            </main>
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                id="back-to-top"
                style={{ display: showButton ? 'block' : 'none' }}>
                <img src={upArrow} alt="up arrow" />
                <div>Top</div>
            </button>
        </div>
    );
};

export default BlogPage;



