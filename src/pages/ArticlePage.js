import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import { Link, useLocation } from 'react-router-dom';
import '../styles/ArticlePage.css'; 
import ArticleSidebar from '../components/ArticleSidebar';
import axios from 'axios'; 

const ArticlePage = ({ match }) => {
  const [articleData, setArticleData] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      document.title = `WikiWise | ${articleData.title}`;
    }
  }, [articleData]);

  useEffect(() => {
    // Check if user is authenticated
    // If authenticated, set isAuthenticated to true
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    // Fetch data here based on article ID (match.params.id)
    const fetchedData = {
      title: "The Magnetic Fields",
      content: [
          {
              title: "Introduction",
              text: "The Magnetic Fields is an American indie pop group formed in 1989 in Boston, Massachusetts. The band was founded by songwriter, producer, and instrumentalist Stephin Merritt.",
              info: {
                  title: "The Magnetic Fields",
                  image: {
                      alt: "The Magnetic Fields Image",
                      src: "http://via.placeholder.com/300x250"
                  },
                  info: [
                      { label: "Origin", value: "Boston, Massachusetts, U.S." },
                      { label: "Years Active", value: "1989–present" },
                      { label: "Genres", header: true },
                      { label: "Primary Genre", value: "Indie pop" },
                      { label: "Associated Acts", value: "The 6ths, Future Bible Heroes" },
                      { label: "Lead", value: "Stephin Merritt" }
                  ]
              }
          },
          {
              title: "Major Works",
              text: "The Magnetic Fields is best known for their 1999 three-volume concept album '69 Love Songs'. The album, which features songs of various genres and themes, is often considered the band's magnum opus.",
          },
          {
              title: "Style and Themes",
              text: "Merritt's lyrics are known for their wit and irony. The band's sound is characterized by a variety of instruments, ranging from the accordion to the cello."
          },
      ],
      references: [
          { name: "AllMusic - The Magnetic Fields", link: "https://www.allmusic.com/artist/the-magnetic-fields-mn0000474796" },
          { name: "Wikipedia - The Magnetic Fields", link: "https://en.wikipedia.org/wiki/The_Magnetic_Fields" }
      ]
    };
    
    setArticleData(fetchedData);
  }, [match.params.id]);

  useEffect(() => {
    // will need to change this to match the API endpoint
    axios.get(`/api/articles/${match.params.id}`)
      .then(response => {
        setArticleData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [match.params.id]);

  if (loading) return <div className="article-page">Loading...</div>;
  if (error) return <div className="article-page">Error: {error}</div>;

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
          <div className="article-talk-subcontainer">
            <Link to={`/${match.params.portalid}/article/${match.params.id}`} className="selected-tab">
              Article
            </Link>
            <Link to={`/${match.params.portalid}/article/${match.params.id}/talk`}>
              Talk
            </Link>
          </div>
          <div className="article-edit-container">
            {isAuthenticated && (
              <Link to={`/${match.params.portalid}/article/${match.params.id}/edit`}>
                Edit
              </Link>
            )}
          </div>
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
        {/* replace this with icon*/}
        ↑ Top
      </button>
    </div>
  );
};

export default ArticlePage