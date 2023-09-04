import React from 'react';
import Article from '../components/Article';
import SideMenu from '../components/SideMenu';
import '../styles/HomePage.css';

const HomePage = () => {
    const wikiWiseIntroduction = {
        title: "Welcome to WikiWise",
        content: [
            { 
                title: "What is WikiWise?", 
                text: "WikiWise is a unique platform that empowers independent creators and fans to collaboratively build, expand, and explore diverse universes. Think of it as a space where your wildest imaginations and stories come to life and intertwine with others." 
            },
            { 
                title: "Our Mission", 
                text: "We believe in the power of community and storytelling. WikiWise is dedicated to providing a space where creators can freely share their narratives and fans can contribute to the lore." 
            },
            {
                title: "Getting Started",
                text: "Whether you're a seasoned creator or a passionate fan, there's a place for you here. Start by creating an account, explore our existing universes, or begin crafting your own!"
            }
        ],
        references: [],
    };

    return (
        <div className="home-page">
            <div className="home-container">
                <SideMenu />
                <div className="main-content">
                    <Article 
                        title={wikiWiseIntroduction.title} 
                        content={wikiWiseIntroduction.content} 
                        references={wikiWiseIntroduction.references} 
                    />
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
            </div>
        </div>
    );
};

export default HomePage;