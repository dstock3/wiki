import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TalkPageSidebar from '../../components/TalkPageSidebar';
import '../../styles/TalkPage.css';
import axios from 'axios';
import Loading from '../../components/Loading';

const TalkPage = ({ match, title, endpoint, csrfToken }) => {
  const [topics, setTopics] = useState([]);
  const [commentContents, setCommentContents] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    document.title = `${title} | Talk Page`;
  }, [title]);

  useEffect(() => {
    axios.get(`${endpoint}/talk/${match.params.articleid}`, { withCredentials: true })
      .then(response => {
        setTopics(response.data.talkPage.discussions);
        setIsAuthenticated(response.data.isAuthorized);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [match.params.articleid]);

  const postComment = (topicId, commentContent) => {
    
    const newComment = {
      content: commentContent,
    };
    
    axios.post(`${endpoint}/talkpage/${match.params.articleId}/topic/${topicId}/comment`, newComment, {
      headers: {
        'csrf-token': csrfToken
      }
      .then(response => {
        const updatedTopics = [...topics];
        const targetTopic = updatedTopics.find(d => d._id === topicId);
        targetTopic.comments.push(newComment);
        setTopics(updatedTopics);
        setCommentContents(prev => ({...prev, [topicId]: ''}));
      })
      .catch(error => {
        console.error("Error posting comment:", error);
      })
    })
    
  };

  if (loading) return <div className="talk-page">
    <Loading loading={loading} />
  </div>;
  if (error) return <div className="talk-page">Error: {error}</div>;

  return (
    <div className="talk-page">
      <TalkPageSidebar topics={topics}/>
      <div className="talk-container">
        <div className="article-talk-container">
          <div className="article-talk-subcontainer">
            <Link to={`/${match.params.portalid}/article/${match.params.articleid}`} className="">
              Article
            </Link>
            <Link to={`/${match.params.portalid}/article/${match.params.articleid}/talk`} className="selected-tab">
              Talk
            </Link>
          </div>
        </div>
        <div className="talk-head-container">
          <h1>Talk: {match.params.articleId}</h1>
          {isAuthenticated && (
            <Link  to={`/${match.params.portalid}/article/${match.params.articleid}/talk/create`} className="create-topic">Create New Topic</Link>
          )}
        </div>

        {!topics.length && <div className="discussion-message">No discussions yet.</div>}
        <ul>
          {topics.map((topic, index) => (
            <>
              <li className="topic" key={index}>
                <h3>{topic.title}</h3>
                <div className="topic-content" dangerouslySetInnerHTML={{ __html: topic.content }} />
                {topic.comments.map((comment, index) => (
                  <div key={`${topic._id}-${index}`} className="comment" id={`topic-${index}`}>
                    <strong>{comment.username}:</strong> {comment.content} <span>{comment.date}</span>
                  </div>
                ))}
              </li>
              {isAuthenticated && (
                <div className="add-comment">
                  <textarea 
                    placeholder="Add a comment..." 
                    value={commentContents[topic._id] || ''} 
                    onChange={e => setCommentContents({...commentContents, [topic._id]: e.target.value})}
                  />
                  <button className="add-comment-button" onClick={() => {
                    postComment(topic._id, commentContents[topic._id]);
                  }}>Post</button>
                </div>
              )}
              {index !== topics.length - 1 && <hr />}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TalkPage;