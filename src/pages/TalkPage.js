import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TalkPageSidebar from '../components/TalkPageSidebar';
import '../styles/TalkPage.css';

const TalkPage = ({ match }) => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    document.title = `WikiWise | Talk Page`;
  }, []);

  useEffect(() => {
    // Fetch talk discussions based on article ID (match.params.id)
    // For demonstration, using hardcoded data
    const talkData = [
      {
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

  return (
    <div className="talk-page">
      <TalkPageSidebar discussions={discussions}/>
      <div className="talk-container">
        <div className="article-talk-container">
          <Link to={`/${match.params.portalid}/article/${match.params.id}`} className="">
            Article
          </Link>
          <Link to={`/${match.params.portalid}/article/${match.params.id}/talk`} className="selected-tab">
            Talk
          </Link>
        </div>
        <h1>Talk: {match.params.id}</h1>
        <ul>
          {discussions.map((discussion, index) => (
            <li key={index}>
              <h3>{discussion.topic}</h3>
              {discussion.comments.map((comment, index) => (
                <div key={index} className="comment" id={`topic-${index}`}>
                  <strong>{comment.username}:</strong> {comment.content} <span>{comment.date}</span>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default TalkPage;