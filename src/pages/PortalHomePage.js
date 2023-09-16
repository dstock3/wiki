import React, { useEffect, useState } from 'react';
import '../styles/PortalHomePage.css';

const PortalHomePage = ({ match }) => {
  const [portalData, setPortalData] = useState(null);

  useEffect(() => {
    document.title = `WikiWise | Portal Home`;
  }, []);

  useEffect(() => {
    // fetch portal data from API based on portal ID
    
    const fetchedPortalData = {
      portalTitle: "Nature & Wildlife",
      portalDescription: "This portal is dedicated to all things nature and wildlife.",
      featuredArticle: {
        title: "Peregrine Falcon",
        summary: "A bird of prey renowned for its speed...",
        link: "/nature-wildlife/article/peregrine-falcon"
      },
      recentUpdates: [
        { title: "Mountain Lion", link: "/nature-wildlife/article/mountain-lion" },
      ]
    };

    setPortalData(fetchedPortalData);
  }, [match.params.portalid]);

  return (
    <div className="portal-home-page">
      {portalData && (
        <>
          <h1>{portalData.portalTitle}</h1>
          <hr />
          <div className="portal-description">
            <p>{portalData.portalDescription}</p>
            <div className="portal-image">
              <img src="https://via.placeholder.com/250" alt="placeholder" />
            </div>
          </div>
          <div className="featured-article">
            <h2>Featured Article: {portalData.featuredArticle.title}</h2>
            <p>{portalData.featuredArticle.summary}</p>
            <a href={portalData.featuredArticle.link}>Read More</a>
          </div>
          
          <div className="recent-updates">
            <h3>Recent Updates</h3>
            <ul>
              {portalData.recentUpdates.map((article, index) => (
                <li key={index}>
                  <a href={article.link}>{article.title}</a>
                </li>
              ))}
            </ul>
          </div>
          
        </>
      )}
    </div>
  );
};

export default PortalHomePage;