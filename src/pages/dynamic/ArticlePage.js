import React, { useEffect, useState } from 'react';
import Article from '../../components/Article';
import { Link } from 'react-router-dom';
import '../../styles/ArticlePage.css'; 
import ArticleSidebar from '../../components/ArticleSidebar';
import axios from 'axios'; 
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';

const ArticlePage = ({ match, endpoint, title, csrfToken }) => {
  const [articleData, setArticleData] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

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
    if (articleData) {
      document.title = `${title} | ${articleData.title}`;
    }
  }, [articleData]);

  useEffect(() => {
    axios.get(`${endpoint}/articles/${match.params.articleid}`)
      .then(response => {
        setArticleData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });

    // Check if user is authenticated
    // If authenticated, set isAuthenticated to true
    setIsAuthenticated(true);
  }, [match.params.articleid]);

  const articleDeleteHandler = () => {
    const config = {
      withCredentials: true,
      headers: {
          'csrf-token': csrfToken
      }
    };
    axios.delete(`${endpoint}/articles/${match.params.articleid}`, config)
    .then(response => {
      history.push(`/${match.params.portalid}`);
    })
    .catch(error => {
      setError(error);
    });
  };

  if (loading) return <div className="article-page">
    <Loading loading={loading} />
  </div>;

  if (error) return <div className="article-page">Error: {error}</div>;

  return (
    <div className="article-page">
      {articleData && (
        <ArticleSidebar 
          intro={articleData.intro}
          content={articleData.content}
        />
      )}
      <main className="article-page-container">
        <div className="article-talk-container">
          <div className="article-talk-subcontainer">
            <Link to={`/${match.params.portalid}/article/${match.params.articleid}`} className="selected-tab">
              Article
            </Link>
            <Link to={`/${match.params.portalid}/article/${match.params.articleid}/talk`}>
              Talk
            </Link>
          </div>
          <div className="article-edit-container">
            {isAuthenticated && (
              <>
                <Link to={`/${match.params.portalid}/article/${match.params.articleid}/edit`}>
                  Edit
                </Link>
                <button className="article-delete-button" onClick={articleDeleteHandler}>Delete</button>
              </>
            )}
          </div>
        </div>
        {articleData && (
            <Article
                match={match}
                title={articleData.title}
                intro={articleData.intro}
                infobox={articleData.infoBox}
                content={articleData.content}
                references={articleData.references}
                isAuthenticated={isAuthenticated}
            />
        )}
      </main>
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
        id="back-to-top" 
        style={{ display: showButton ? 'block' : 'none' }}>
        {/* replace this with icon*/}
        ↑ Top
      </button>
    </div>
  );
};

export default ArticlePage