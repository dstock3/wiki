import React, { useEffect, useState } from 'react';
import Article from '../../components/Article';
import { Link } from 'react-router-dom';
import '../../styles/ArticlePage.css'; 
import ArticleSidebar from '../../components/ArticleSidebar';
import DeleteModal from '../../components/DeleteModal';
import axios from 'axios'; 
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading';
import upArrow from '../../assets/up.svg';

const ArticlePage = ({ match, endpoint, title, csrfToken }) => {
  const [articleData, setArticleData] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1))
      if (elem) elem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

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
    axios.get(`${endpoint}/articles/${match.params.articleid}`, { withCredentials: true })
      .then(response => {
        setArticleData(response.data.article);
        setIsAuthenticated(response.data.isAuthor || response.data.isAdmin);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });    
  }, [match.params.articleid]);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };
  
  const confirmDeleteArticle = () => {
    const deleteUrl = `${endpoint}/articles/${match.params.articleid}?_csrf=${encodeURIComponent(csrfToken)}`;
  
    axios.delete(deleteUrl, { withCredentials: true })
      .then(response => {
        setDeleteModalOpen(false);
        history.push(`/wiki/${match.params.portalid}`);
      })
      .catch(error => {
        setError(error.response?.data?.message || error.message);
        setDeleteModalOpen(false);
      });
  };
  
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  

  if (loading) return <div className="article-page">
    <Loading loading={loading} />
  </div>;

  if (error) return <div className="article-page">Error: {error}</div>;

  return (
    <div className="article-page">
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteArticle}
          msg="article"
        />
      )}
      {articleData && (
        <ArticleSidebar 
          intro={articleData.intro}
          content={articleData.content}
        />
      )}
      <main className="article-page-container">
        <div className="article-talk-container">
          <div className="article-talk-subcontainer">
            <Link to={`/wiki/${match.params.portalid}/article/${match.params.articleid}`} className="selected-tab">
              Article
            </Link>
            <Link to={`/wiki/${match.params.portalid}/article/${match.params.articleid}/talk`}>
              Talk
            </Link>
          </div>
          <div className="article-edit-container">
            {isAuthenticated && (
              <>
                <Link to={`/wiki/${match.params.portalid}/article/${match.params.articleid}/edit`}>
                  Edit
                </Link>
                <button className="article-delete-button" onClick={openDeleteModal}>Delete</button>
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
          <img src={upArrow} alt="up arrow" /> 
          <div>Top</div>
      </button>
    </div>
  );
};

export default ArticlePage