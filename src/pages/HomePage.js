import React, { useEffect } from 'react';
import SideMenu from '../components/SideMenu';
import '../styles/HomePage.css';

const HomePage = () => {
    useEffect(() => {
      document.title = `WikiWise`;
    }, []);

    return (
        <div className="home-page">
            <div className="home-container">
                <SideMenu />
                <div className="main-content">
                  <article className="article-container">
                    <h1 className="article-title">Welcome to WikiWise</h1>
                    <div className="article-content">
                        <div className="article-section">
                          <h2>What is WikiWise?</h2>
                          <p>WikiWise is a unique platform that empowers independent creators and fans to collaboratively build, expand, and explore diverse universes. Think of it as a space where your wildest imaginations and stories come to life and intertwine with others.</p>
                        </div>

                        <div className="article-section">
                          <h2>Our Mission</h2>
                          <p>We believe in the power of community and storytelling. WikiWise is dedicated to providing a space where creators can freely share their narratives and fans can contribute to the lore.</p>
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
                        <div className="join-community">
                            <h2>Join the WikiWise Community</h2>
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