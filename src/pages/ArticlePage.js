import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import { Link } from 'react-router-dom';
import '../styles/ArticlePage.css'; 

const ArticlePage = ({ match }) => {
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    // Fetch data here based on article ID (match.params.id)
    // currently using hardcoded data
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
        <Link to={`/article/${match.params.id}/talk`}>Go to Talk Page</Link>
        {articleData && (
            <Article
                title={articleData.title}
                content={articleData.content}
                references={articleData.references}
            />
        )}
    </div>
  );
};

export default ArticlePage;