import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TalkPageSidebar from '../../components/TalkPageSidebar';
import TalkPageBoilerplate from '../../components/TalkPageBoilerplate';
import '../../styles/TalkPage.css';
import axios from 'axios';
import Loading from '../../components/Loading';
import ReactQuill from 'react-quill';
import Comment from '../../components/Comment';
import EditLink from '../../components/EditLink';
import { formatDate } from '../../utils/textParsers';

const TalkPage = ({ match, title, endpoint, csrfToken }) => {
  const [topics, setTopics] = useState([]);
  const [articleTitle, setArticleTitle] = useState('');
  const [commentContents, setCommentContents] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [articleAuthorId, setArticleAuthorId] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `${title} | Talk Page`;
  }, [title]);

  useEffect(() => {
    axios.get(`${endpoint}/talk/${match.params.articleid}`, { withCredentials: true })
      .then(response => {
        setTopics(response.data.talkPage.discussions);
        setArticleTitle(response.data.talkPage.articleTitle)
        setIsAuthenticated(response.data.isAuthorized);
        setArticleAuthorId(response.data.talkPage.articleAuthorId);
        setCurrentUserId(response.data.talkPage.currentUserId);
        setLoading(false);
        console.log(response.data)
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

    const config = {
      withCredentials: true,
      headers: { 'csrf-token': csrfToken }
    };
    
    axios.post(`${endpoint}/talk/${match.params.articleid}/topics/${topicId}/comments`, newComment, config)
      .then(response => {
        const updatedTopics = [...topics];
        const targetTopicIndex = updatedTopics.findIndex(topic => topic._id === topicId);
        
        updatedTopics[targetTopicIndex].comments.push(response.data.comment);

        setTopics(updatedTopics);
        setCommentContents(prev => ({...prev, [topicId]: ''}));
      })
      .catch(error => {
        console.error("Error posting comment:", error);
        setError(error.message);
      });
  };

  const onEditSuccess = (topicId, updatedComment) => {
    setTopics(prevTopics => {
      return prevTopics.map(topic => {
        if (topic._id === topicId) {
          return {
            ...topic,
            comments: topic.comments.map(comment => {
              if (comment._id === updatedComment._id) {
                return updatedComment;
              }
              return comment;
            }),
          };
        }
        return topic;
      });
    });
  };
  
  if (loading) return <div className="talk-page">
    <Loading loading={loading} />
  </div>;
  
  if (error) return <div className="talk-page">
    Error: {error}
  </div>;

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
          <h1>Talk: {articleTitle}</h1>
          {isAuthenticated && (
            <Link  to={`/${match.params.portalid}/article/${match.params.articleid}/talk/create`} className="create-topic">Create New Topic</Link>
          )}
        </div>
        <TalkPageBoilerplate articleTitle={articleTitle}/>

        {!topics.length && <div className="discussion-message">No discussions yet.</div>}
        <ul className="topics">
          {topics.map((topic, index) => (
            <>
              <li className="topic" key={index}>
                <div className="topic-header">
                  <div className="topic-title">
                    <h3>{topic.title}</h3>
                    {topic.isAuthorized && (
                        <EditLink linkTo={`/${match.params.portalid}/article/${match.params.articleid}/talk/${topic._id}/edit`} linkClass="edit-topic" />
                    )}
                  </div>

                  <div className="topic-subhead">
                    <div>Posted by <Link to={`/user/${topic.author}`}>{topic.author}</Link></div>
                    <div className="topic-date">{formatDate(topic.date)}</div>
                  </div>
                </div>
                
                <div className="topic-content" dangerouslySetInnerHTML={{ __html: topic.content }} />
                {topic.comments.map((comment, index) => (
                  <Comment 
                    key={`${topic._id}-${index}`} 
                    index={index} 
                    endpoint={endpoint}
                    topicId={topic._id}
                    articleId={match.params.articleid}
                    comment={comment} 
                    currentUserId={currentUserId}
                    articleAuthorId={articleAuthorId}
                    csrfToken={csrfToken}
                    onEditSuccess={onEditSuccess}
                    onDeleteSuccess={commentId => {
                      const updatedTopics = [...topics];
                      const targetTopic = updatedTopics.find(d => d._id === topic._id);
                      targetTopic.comments = targetTopic.comments.filter(c => c._id !== commentId);
                      setTopics(updatedTopics);
                      }
                    }
                  />
                ))}
              </li>
              {isAuthenticated && (
                <div className="add-comment">
                  <div className="add-comment-header">Add a comment</div>
                  <ReactQuill 
                      placeholder="Add a comment..."
                      value={commentContents[topic._id] || ''}
                      onChange={value => setCommentContents({...commentContents, [topic._id]: value})}
                  />
                  <button className="add-comment-button" onClick={() => {
                    postComment(topic._id, commentContents[topic._id]);
                  }}>Post</button>
                </div>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TalkPage;