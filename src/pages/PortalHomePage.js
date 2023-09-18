import React, { useEffect, useState } from 'react';
import '../styles/PortalHomePage.css';
import PortalSidebar from '../components/PortalSidebar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'; 

const PortalHomePage = ({ match }) => {
  const [portalData, setPortalData] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    document.title = `WikiWise | Portal Home`;
  }, []);

  useEffect(() => {
    // fetch portal data from API based on portal ID

    const fetchedPortalData = {
      portalTitle: "Nature & Wildlife",
      portalDescription: "This portal is dedicated to all things nature and wildlife. From the smallest insect to the largest mammal, we have it all! We also have a special section for plants and fungi. If you're interested in learning more about the natural world, you've come to the right place! We have articles on everything from the common house cat to the rarest of birds. We also have articles on plants and fungi, so if you're interested in learning more about the natural world, you've come to the right place!",
      portalImage: {
        src: "https://via.placeholder.com/250",
        alt: "placeholder image"
      },
      articles: [
        { title: "Peregrine Falcon", link: "/article/peregrine-falcon" },
        { title: "Mountain Lion", link: "/article/mountain-lion" },
        // ... more articles
      ],
      featuredArticle: {
        title: "Peregrine Falcon",
        summary: "A bird of prey renowned for its speed and agility, the peregrine falcon is one of the most widespread birds in the world. It is found on every continent except Antarctica, and it is the fastest animal on Earth. It can reach speeds of up to 200 miles per hour when diving for prey.",
        link: "/nature-wildlife/article/peregrine-falcon"
      },
      recentUpdates: [
        { title: "Mountain Lion", link: "/nature-wildlife/article/mountain-lion" },
      ]
    };

    setPortalData(fetchedPortalData);

  }, [match.params.portalid]);

  useEffect(() => {
    // will need to change this to match the API endpoint
    axios.get(`/api/portals/${match.params.portalid}`)
      .then(response => {
        setPortalData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });

    // if user is authorized, set auth to true
    // need more logic here to check actual authentication
    setAuth(true);
  }, [match.params.portalid]);

  if (loading) return <div className="portal-home-page">Loading...</div>;
  if (error) return <div className="portal-home-page">Error: {error}</div>;

  return (
    <div className="portal-home-page">
      {portalData && (
        <>
          <PortalSidebar articles={portalData.articles} />
          <div className="portal-home-container">
            <div className="portal-home-header">
              <h1>{portalData.portalTitle}</h1>
              {auth && (
                <div className="portal-home-header-links">
                  <Link to={`/${match.params.portalid}/edit`}>Edit Portal</Link>
                  <Link to={`/${match.params.portalid}/article/create`}>Create Article</Link>
                </div>
              )}
            </div>
            <hr />
            <div className="portal-description">
              <p>{portalData.portalDescription}</p>
              <div className="portal-image">
                <img src={portalData.portalImage.src} alt={portalData.portalImage.alt} />
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
          </div>
        </>
      )}
    </div>
  );
};

export default PortalHomePage;