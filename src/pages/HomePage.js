import React from 'react';
import Article from '../components/Article';
import SideMenu from '../components/SideMenu';
import '../styles/HomePage.css';

const HomePage = () => {
  // Sample article data
  const sampleArticle = {
    title: "Welcome to WikiWise",
    content: [
      { title: "Introduction", text: "This is a sample introduction." },
      { title: "Features", text: "Here are some features." },
    ],
    references: [
      { name: "Reference 1", link: "#" },
      { name: "Reference 2", link: "#" },
    ],
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <SideMenu />
        <Article 
          title={sampleArticle.title} 
          content={sampleArticle.content} 
          references={sampleArticle.references} 
        />
      </div>
    </div>
  );
};

export default HomePage;
