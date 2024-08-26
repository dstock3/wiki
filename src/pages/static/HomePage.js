import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideMenu from '../../components/SideMenu';
import '../../styles/HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = ({ endpoint, title }) => {
    const [latestBlog, setLatestBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        const fetchLatestBlog = async () => {
            try {
                const response = await axios.get(`${endpoint}/blogs`);
                const data = await response.data;
                const sortedBlogs = data.blogs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
                if (sortedBlogs.length > 0) {
                    setLatestBlog(sortedBlogs[0]);
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchLatestBlog();
    }, [endpoint]);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    return (
        <div className="home-page">
            <div className="home-container">
                <SideMenu />
                <div className="main-content">
                    <article className="article-container">
                        <h1 className="article-title">Welcome to {title}</h1>
                        <div className="article-content">
                            {/* Other sections remain unchanged */}
                            <div className="article-section">
                                <h2>What is {title}?</h2>
                                <p>{title} is a unique platform that empowers independent creators and fans to collaboratively build, expand, and explore diverse universes. Think of it as a space where your wildest imaginations and stories come to life and intertwine with others.</p>
                            </div>

                            <div className="article-section">
                                <h2>Our Mission</h2>
                                <p>We believe in the power of community and storytelling. {title} is dedicated to providing a space where creators can freely share their narratives and fans can contribute to the lore.</p>
                            </div>

                            <div className="article-section">
                                <h2>Getting Started</h2>
                                <p>Whether you're a seasoned creator or a passionate fan, there's a place for you here. Start by creating an account, explore our existing universes, or begin crafting your own!</p>
                            </div>
                            <div className="features-section">
                                <h2>Unique Features</h2>
                                <ul>
                                    <li>Collaborative Universe Building: Join hands with others to craft intricate worlds.</li>
                                    <li>Dynamic Talk Pages: Engage in enriching discussions, share ideas, and debate theories.</li>
                                    <li>Creator Spotlights: Every month, we highlight standout creators and their contributions.</li>
                                    <li>Intuitive Editor: Our state-of-the-art editor ensures your stories look as good as they read.</li>
                                </ul>
                            </div>

                            {latestBlog && (
                                <div className="latest-blog-preview">
                                    <h2>Latest Blog Post</h2>
                                    <div className="latest-blog-content">
                                        <h3>{latestBlog.title}</h3>
                                        <p>Posted on: {new Date(latestBlog.postedDate).toLocaleDateString()}</p>
                                        <p>{truncateText(latestBlog.body.replace(/(<([^>]+)>)/gi, ""), 150)}</p>
                                        <Link to="/wiki/blog" className="read-more-button">Read More</Link>
                                    </div>
                                </div>
                            )}

                            {error && <div>Error: {error}</div>}

                            <div className="join-community">
                                <h2>Join the {title} Community</h2>
                                <p>Become a part of a growing community of creators and fans. Share, explore, and create today!</p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
