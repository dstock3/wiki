import React, { useEffect, useState } from 'react';
import '../styles/TalkPage.css';  // Assuming you'll have a CSS file for styling

const TalkPage = ({ match }) => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    // Fetch talk discussions based on article ID (match.params.id)
    // currently using hardcoded data
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