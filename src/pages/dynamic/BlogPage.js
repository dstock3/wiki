import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';

const BlogPage = ({ match, endpoint, title }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blogDate, setBlogData] = useState(null);

    useEffect(() => {
        if (articleData) {
            document.title = `${title} | ${articleData.title}`;
        }
    }, [articleData]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`${endpoint}/${match.params.id}`);
                const data = await response.json();
                setBlogData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchArticle();
    }, [endpoint, match.params.id]);

    if (loading) return (
        <div className="article-page">
            <Loading loading={loading} />
        </div>
    );

    if (error) return (
        <div className="article-page">
            Error: {error}
        </div>
    );

    return (
        <div className="blog-container">
            <div className="blog-content">
                <h1>{setBlogData.title}</h1>
                <p>Posted on: {new Date(setBlogData.postedDate).toLocaleDateString()}</p>
                <div dangerouslySetInnerHTML={{ __html: setBlogData.body }} />
            </div>
            <div className="blog-sidebar">
                {/* create a separate component for this*/}
                <ul>
                    <li><a href="/blog/1">Previous Entry 1</a></li>
                    <li><a href="/blog/2">Previous Entry 2</a></li>
                    <li><a href="/blog/3">Previous Entry 3</a></li>
                </ul>
            </div>
        </div>
    );
};

export default BlogPage;