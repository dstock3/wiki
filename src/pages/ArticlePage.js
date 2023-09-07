import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import { Link, useLocation } from 'react-router-dom';
import '../styles/ArticlePage.css'; 
import ArticleSidebar from '../components/ArticleSidebar';

const ArticlePage = ({ match }) => {
  const [articleData, setArticleData] = useState(null);
  const [showButton, setShowButton] = useState(false);
  
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
    // Fetch data here based on article ID (match.params.id)
    const fetchedData = {
      title: "Peregrine Falcon",
      content: [
          {
              title: "Introduction",
              text: "The peregrine falcon, also known as the peregrine, and historically as the duck hawk in North America, is a widespread bird of prey in the family Falconidae.",
              info: {
                  title: "Peregrine Falcon",
                  image: {
                      alt: "Peregrine Falcon Image",
                      src: "http://via.placeholder.com/350x250"
                  },
                  info: [
                      { label: "Kingdom", value: "Animalia" },
                      { label: "Phylum", value: "Chordata" },
                      { label: "Class", header: true },
                      { label: "Order", value: "Falconiformes" },
                      { label: "Genus", value: "Falco" },
                      { label: "Average Speed", value: "240 km/h" },
                  ]
              }
          },
          {
              title: "Habitat and Distribution",
              text: "Peregrine falcons are among the world's most common birds of prey and live on all continents except Antarctica. They prefer wide-open spaces, and thrive near coasts where shorebirds are common, but they can be found everywhere from tundra to deserts.",
          },
          {
              title: "Diet",
              text: "The peregrine falcon feeds almost exclusively on medium-sized birds such as pigeons and doves, waterfowl, songbirds, and waders."
          },
      ],
      references: [
          { name: "National Geographic - Peregrine Falcon", link: "https://www.nationalgeographic.com" },
          { name: "Wikipedia - Peregrine Falcon", link: "https://en.wikipedia.org/wiki/Peregrine_falcon" }
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
          <Link to={`/${match.params.portalid}/article/${match.params.id}`} className="selected-tab">
            Article
          </Link>
          <Link to={`/${match.params.portalid}/article/${match.params.id}/talk`}>
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