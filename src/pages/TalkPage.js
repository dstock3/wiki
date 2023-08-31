import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TalkPage.css';

const TalkPage = ({ match }) => {
  const [discussions, setDiscussions] = useState([]);
  
  useEffect(() => {
    // Fetch talk discussions based on article ID (match.params.id)
    // For demonstration, using hardcoded data
    const fetchedData = [
      {
        username: "User1",
        comment: "I think this article could use more references."
      },
      {
        username: "User2",
        comment: "Agreed. The historical section is lacking in citations."
      }
    ];

    setDiscussions(fetchedData);
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
            <strong>{discussion.username}:</strong> {discussion.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TalkPage;