import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import BlogSidebar from '../../components/BlogSidebar';
import '../../styles/BlogPage.css';
import upArrow from '../../assets/up.svg'; 

const BlogPage = ({ match, endpoint, title }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blogData, setBlogData] = useState(null);
    const [links, setLinks] = useState([]);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        if (blogData) {
            document.title = `${title} | ${blogData.title}`;
        }
    }, [blogData, title]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                /*
                const response = await fetch(`${endpoint}/${match.params.id}`);
                const data = await response.json();
                setBlogData(data.blog);
                setLinks(data.links);
                */
                // Sample blog data for demonstration purposes
                const sampleData = {
                    blog: {
                        title: "Sample Blog Title",
                        postedDate: "2024-07-29T00:00:00Z",
                        body: "<p>This is a sample blog post content. It contains some text to show how the blog content will be displayed.</p>"
                    },
                    links: [
                        { id: 1, title: "Related Article 1", url: "/related-article-1" },
                        { id: 2, title: "Related Article 2", url: "/related-article-2" }
                    ]
                };
                setBlogData(sampleData.blog);
                setLinks(sampleData.links);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchArticle();
    }, [endpoint, match.params.id]);

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
                <div className="blog-content">
                    <h1>{blogData.title}</h1>
                    <p>Posted on: {new Date(blogData.postedDate).toLocaleDateString()}</p>
                    <div dangerouslySetInnerHTML={{ __html: blogData.body }} />
                </div>
            </main>
            {links && links.length > 0 && (
                <BlogSidebar links={links} />
            )}
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
