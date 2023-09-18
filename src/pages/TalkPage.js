import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TalkPageSidebar from '../components/TalkPageSidebar';
import '../styles/TalkPage.css';
import axios from 'axios';

const TalkPage = ({ match }) => {
  const [discussions, setDiscussions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    document.title = `WikiWise | Talk Page`;

    // Check if user is authenticated
    // If authenticated, set isAuthenticated to true
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    // Fetch talk discussions based on article ID (match.params.id)
    // For demonstration, using hardcoded data
    const talkData = [
      {
        topicId: "topic-1",
        topic: "Need for References",
        comments: [
          {
            username: "User1",
            content: "This article could benefit from more references, especially in the early history section.",
            date: "2020-01-01"
          },
          {
            username: "User2",
            content: "I concur. I've found a couple of scholarly articles that can be used as references.",
            date: "2020-01-02"
          },
          {
            username: "User3",
            content: "Can you list those articles, User2? I can help in integrating them into the article.",
            date: "2020-01-03"
          }
        ]
      },
      {
        topicId: "topic-2",
        topic: "Article Image Quality",
        comments: [
          {
            username: "User4",
            content: "The main image of the article is low quality. We should find a higher resolution image.",
            date: "2020-01-04"
          },
          {
            username: "User5",
            content: "I agree with User4. Also, the image is from 2009. Perhaps something more recent would be relevant.",
            date: "2020-01-05"
          }
        ]
      },
      {
        topicId: "topic-3",
        topic: "Content Organization",
        comments: [
          {
            username: "User6",
            content: "Should we consider re-organizing the content? The current flow feels a bit off.",
            date: "2020-01-06"
          },
          {
            username: "User1",
            content: "I felt the same. The 'Modern Influence' section should come before the 'Legacy' section.",
            date: "2020-01-07"
          },
          {
            username: "User7",
            content: "That makes sense. We can also move the 'Criticism' section towards the end.",
            date: "2020-01-08"
          }
        ]
      },
      {
        topicId: "topic-4",
        topic: "Neutrality Concerns",
        comments: [
          {
            username: "User8",
            content: "Some parts of the article seem to be biased. We need to ensure neutrality.",
            date: "2020-01-09"
          },
          {
            username: "User9",
            content: "Which sections are you referring to, User8? It would help to be specific.",
            date: "2020-01-10"
          }
        ]
      }
    ];

    setDiscussions(talkData);
  }, [match.params.id]);

  useEffect(() => {
    // will need to change this to match the API endpoint
    axios.get(`/api/talk/${match.params.id}`)
      .then(response => {
        setDiscussions(response.data.discussions);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [match.params.id]);

  const postComment = (topicId, commentContent) => {
    const newComment = {
      username: "LoggedInUser", // update this to use the actual username
      content: commentContent,
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };

    axios.post(`/api/talkpage/${match.params.id}/topic/${topicId}/comment`, newComment)
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

  if (loading) return <div className="talk-page">Loading...</div>;
  if (error) return <div className="talk-page">Error: {error}</div>;

  return (
    <div className="talk-page">
      <TalkPageSidebar discussions={discussions}/>
      <div className="talk-container">
        <div className="article-talk-container">
          <div className="article-talk-subcontainer">
            <Link to={`/${match.params.portalid}/article/${match.params.id}`} className="">
              Article
            </Link>
            <Link to={`/${match.params.portalid}/article/${match.params.id}/talk`} className="selected-tab">
              Talk
            </Link>
          </div>
        </div>
        <h1>Talk: {match.params.id}</h1>
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