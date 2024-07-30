import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';
import BlogSidebar from '../../components/BlogSidebar';
import '../../styles/BlogPage.css';
import upArrow from '../../assets/up.svg';

const BlogPage = ({ endpoint, title }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blogs, setBlogs] = useState([]);
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
                /*
                const response = await axios.get(`${endpoint}/blogs`);
                const data = await response.data;
                const sortedBlogs = data.blogs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
                setBlogs(sortedBlogs);
                */
                // Sample blogs data for demonstration purposes
                const sampleData = {
                    blogs: [
                        {
                            id: 1,
                            title: "Sample Blog Title 1",
                            postedDate: "2024-07-29T00:00:00Z",
                            body: "<p>This is a sample blog post content 1. It contains some text to show how the blog content will be displayed.</p>"
                        },
                        {
                            id: 2,
                            title: "Sample Blog Title 2",
                            postedDate: "2024-07-30T00:00:00Z",
                            body: "<p>This is a sample blog post content 2. It contains some text to show how the blog content will be displayed.</p>"
                        }
                    ]
                };
                const sortedBlogs = sampleData.blogs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
                setBlogs(sortedBlogs);
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
            <main className="blog-page-container">
                {blogs.map(blog => (
                    <div key={blog.id} className="blog-content">
                        <h1>{blog.title}</h1>
                        <p>Posted on: {new Date(blog.postedDate).toLocaleDateString()}</p>
                        <div dangerouslySetInnerHTML={{ __html: blog.body }} />
                    </div>
                ))}
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

