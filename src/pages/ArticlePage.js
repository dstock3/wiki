import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import { Link, useLocation } from 'react-router-dom';
import '../styles/ArticlePage.css'; 
import ArticleSidebar from '../components/ArticleSidebar';

const ArticlePage = ({ match }) => {
  const [articleData, setArticleData] = useState(null);
  const location = useLocation();
  const isTalkPage = location.pathname.includes('/talk');
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
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
    // Fetch data here based on article ID (match.params.id)
    const fetchedData = {
      title: "Sample Article",
      content: [
        { title: "Introduction", text: "This is an introduction." },
        { title: "Content", text: "This is the main content." }
      ],
      references: [
        { name: "Reference 1", link: "#" },
        { name: "Reference 2", link: "#" }
      ]
    };
    
    setArticleData(fetchedData);
  }, [match.params.id]);

  return (
    <div className="article-page">
      {articleData && (
        <ArticleSidebar 
          content={articleData.content}
          references={articleData.references}
        />
      )}
      <main className="article-page-container">
        <div className="article-talk-container">
          <Link to={`${match.params.id}}/article/${match.params.id}`} className={isTalkPage ? '' : 'selected-tab'}>
            Article
          </Link>
          <Link to={`${match.params.id}}/article/${match.params.id}/talk`} className={isTalkPage ? 'selected-tab' : ''}>
            Talk
          </Link>
        </div>
        {articleData && (
            <Article
                title={articleData.title}
                content={articleData.content}
                references={articleData.references}
            />
        )}
      </main>
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
        id="back-to-top" 
        style={{ display: showButton ? 'block' : 'none' }}>
        ↑ Top
      </button>
    </div>
  );
};

export default ArticlePage