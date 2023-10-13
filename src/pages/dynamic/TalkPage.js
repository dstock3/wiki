import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TalkPageSidebar from '../../components/TalkPageSidebar';
import '../../styles/TalkPage.css';
import axios from 'axios';
import Loading from '../../components/Loading';

const TalkPage = ({ match, title, endpoint, csrfToken }) => {
  const [discussions, setDiscussions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    document.title = `${title} | Talk Page`;
  }, [title]);

  useEffect(() => {
    axios.get(`${endpoint}/talk/${match.params.articleid}`, { withCredentials: true })
      .then(response => {
        setDiscussions(response.data.discussions);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
    // Check if user is authenticated
    // If authenticated, set isAuthenticated to true
    setIsAuthenticated(true);
  }, [match.params.articleid]);

  const postComment = (topicId, commentContent) => {
    const newComment = {
      username: "LoggedInUser", // update this to use the actual username
      content: commentContent,
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };
    
    //need to add csrfToken to the header
    axios.post(`${endpoint}/talkpage/${match.params.articleId}/topic/${topicId}/comment`, newComment)
      .then(response => {
        const updatedDiscussions = [...discussions];
        const targetTopic = updatedDiscussions.find(d => d.topicId === topicId);
        targetTopic.comments.push(newComment);
        setDiscussions(updatedDiscussions);
      })
      .catch(error => {
        console.error("Error posting comment:", error);
      });
  };

  if (loading) return <div className="talk-page">
    <Loading loading={loading} />
  </div>;
  if (error) return <div className="talk-page">Error: {error}</div>;

  return (
    <div className="talk-page">
      <TalkPageSidebar discussions={discussions}/>
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

        {!discussions.length && <div className="discussion-message">No discussions yet.</div>}
        <ul>
          {discussions.map((discussion, index) => (
            <>
              <li key={index}>
                <h3>{discussion.topic}</h3>
                {discussion.comments.map((comment, index) => (
                  <div key={index} className="comment" id={`topic-${index}`}>
                    <strong>{comment.username}:</strong> {comment.content} <span>{comment.date}</span>
                  </div>
                ))}
              </li>
              {isAuthenticated && (
                <div className="add-comment">
                  <textarea placeholder="Add a comment..." id={`textarea-${discussion.topicId}`}></textarea>
                  <button className="add-comment-button" onClick={() => {
                    const commentContent = document.getElementById(`textarea-${discussion.topicId}`).value;
                    postComment(discussion.topicId, commentContent);
                  }}>Post</button>
                </div>
              )}
              {index !== discussions.length - 1 && <hr />}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TalkPage;