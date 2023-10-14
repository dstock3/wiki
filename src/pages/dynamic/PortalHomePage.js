import React, { useEffect, useState } from 'react';
import '../../styles/PortalHomePage.css';
import PortalSidebar from '../../components/PortalSidebar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'; 
import Loading from '../../components/Loading';
import { parseContentToHTML } from '../../utils/textParsers';

const PortalHomePage = ({ match, endpoint, title }) => {
  const [portalData, setPortalData] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    document.title = `${title} | Portal Home`;
  }, [title]);

  useEffect(() => {
    axios.get(`${endpoint}/portals/${match.params.portalid}`, { withCredentials: true })
      .then(response => {
        setPortalData(response.data.portal);
        setAuth(response.data.isViewerOwner);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [match.params.portalid]);
  

  if (loading) return <div className="portal-home-page">
    <Loading loading={loading} />
  </div>;
  if (error) return <div className="portal-home-page">Error: {error}</div>;

  return (
    <div className="portal-home-page">
      {portalData && (
        <>
          <PortalSidebar articles={portalData.articles} portalId={match.params.portalid} />
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
              <div className="portal-desc" dangerouslySetInnerHTML={{ __html: parseContentToHTML(portalData.portalDescription) }} />
              <div className="portal-image">
                <img src={portalData.portalImage.src} alt={portalData.portalImage.alt} />
              </div>
            </div>
            {portalData.featuredArticle && (
              <div className="featured-article">
                <h2>Featured Article: {portalData.featuredArticle.title}</h2>
                <p>{portalData.featuredArticle.summary}</p>
                <Link to={`/${match.params.portalid}/article/${portalData.featuredArticle._id}`}>Read More</Link>
              </div>
            )}
            {portalData.recentUpdates && portalData.recentUpdates.length > 0 && (
              <div className="recent-updates">
                <h3>Recent Updates</h3>
                <ul>
                  {portalData.recentUpdates.map((article, index) => (
                    <li key={index}>
                      <Link to={`/${match.params.portalid}/article/${article._id}`}>{article.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PortalHomePage;