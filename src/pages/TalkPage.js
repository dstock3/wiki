import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TalkPage.css';

const TalkPage = ({ match }) => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    // Fetch talk discussions based on article ID (match.params.id)
    // For demonstration, using hardcoded data
    const talkData = [
      {
        topic: "issue 1",
        comments: [
          {
            username: "User1",
            content: "I think this article could use more references.",
            date: "2020-01-01"
          },
          {
            username: "User2",
            content: "Agreed. The historical section is lacking in citations.",
            date: "2020-01-02"
          }
        ]
      },
      {
        topic: "issue 2",
        comments: [
          {
            username: "User1",
            content: "I think this article could use more references.",
            date: "2020-01-04"
          },
          {
            username: "User2",
            content: "Agreed. The historical section is lacking in citations.",
            date: "2020-01-05"
          }
        ]
      },
    ];

    setDiscussions(talkData);
  }, [match.params.id]);

  return (
    <div className="talk-page">
      <div className="article-talk-container">
        <Link to={`/article/${match.params.id}`} className="">
          Article
        </Link>
        <Link to={`/article/${match.params.id}/talk`} className="selected-tab">
          Talk
        </Link>
      </div>
      <h1>Talk: {match.params.id}</h1>
      <ul>
        {discussions.map((discussion, index) => (
          <li key={index}>
            <h3>{discussion.topic}</h3>
            {discussion.comments.map((comment, index) => (
              <div key={index} className="comment">
                <strong>{comment.username}:</strong> {comment.content} <span>{comment.date}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TalkPage;