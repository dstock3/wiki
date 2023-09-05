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
      title: "Sample Article",
      content: [
        { title: "Introduction", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque elit eget gravida cum sociis natoque penatibus et. Urna nec tincidunt praesent semper feugiat. Purus gravida quis blandit turpis cursus. Malesuada pellentesque elit eget gravida cum. Mi eget mauris pharetra et ultrices neque ornare. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Quis enim lobortis scelerisque fermentum dui faucibus in. Eu facilisis sed odio morbi quis commodo odio aenean. Facilisis volutpat est velit egestas. Mi proin sed libero enim sed faucibus turpis in. At auctor urna nunc id cursus metus aliquam.Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Quis hendrerit dolor magna eget est lorem ipsum dolor. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Varius quam quisque id diam. Velit egestas dui id ornare arcu odio ut sem. Molestie at elementum eu facilisis sed odio morbi. Mollis aliquam ut porttitor leo a diam sollicitudin tempor. Pellentesque pulvinar pellentesque habitant morbi. Diam quis enim lobortis scelerisque fermentum dui faucibus. Mi bibendum neque egestas congue quisque. Amet facilisis magna etiam tempor orci eu lobortis elementum.Cras pulvinar mattis nunc sed blandit. Tortor condimentum lacinia quis vel eros donec. Nulla facilisi nullam vehicula ipsum a arcu. In tellus integer feugiat scelerisque varius morbi enim. Tristique et egestas quis ipsum suspendisse. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Sed velit dignissim sodales ut eu sem integer. Libero nunc consequat interdum varius sit amet mattis vulputate. Nunc non blandit massa enim nec dui nunc. Nulla aliquet porttitor lacus luctus accumsan tortor. Nisi est sit amet facilisis magna etiam tempor. Vel orci porta non pulvinar neque laoreet suspendisse interdum. Volutpat ac tincidunt vitae semper quis lectus nulla. Non sodales neque sodales ut etiam sit amet nisl purus." },
        { title: "Content", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque elit eget gravida cum sociis natoque penatibus et. Urna nec tincidunt praesent semper feugiat. Purus gravida quis blandit turpis cursus. Malesuada pellentesque elit eget gravida cum. Mi eget mauris pharetra et ultrices neque ornare. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Quis enim lobortis scelerisque fermentum dui faucibus in. Eu facilisis sed odio morbi quis commodo odio aenean. Facilisis volutpat est velit egestas. Mi proin sed libero enim sed faucibus turpis in. At auctor urna nunc id cursus metus aliquam.Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Quis hendrerit dolor magna eget est lorem ipsum dolor. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Varius quam quisque id diam. Velit egestas dui id ornare arcu odio ut sem. Molestie at elementum eu facilisis sed odio morbi. Mollis aliquam ut porttitor leo a diam sollicitudin tempor. Pellentesque pulvinar pellentesque habitant morbi. Diam quis enim lobortis scelerisque fermentum dui faucibus. Mi bibendum neque egestas congue quisque. Amet facilisis magna etiam tempor orci eu lobortis elementum.Cras pulvinar mattis nunc sed blandit. Tortor condimentum lacinia quis vel eros donec. Nulla facilisi nullam vehicula ipsum a arcu. In tellus integer feugiat scelerisque varius morbi enim. Tristique et egestas quis ipsum suspendisse. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Sed velit dignissim sodales ut eu sem integer. Libero nunc consequat interdum varius sit amet mattis vulputate. Nunc non blandit massa enim nec dui nunc. Nulla aliquet porttitor lacus luctus accumsan tortor. Nisi est sit amet facilisis magna etiam tempor. Vel orci porta non pulvinar neque laoreet suspendisse interdum. Volutpat ac tincidunt vitae semper quis lectus nulla. Non sodales neque sodales ut etiam sit amet nisl purus." }
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