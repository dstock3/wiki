import React, { useEffect, useState } from 'react';
import '../styles/UserProfilePage.css'
import axios from 'axios';

const UserProfilePage = ({ match, endpoint }) => {
  const [userData, setUserData] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // api call to check if the user is viewing their own profile
    // if so, set isUser to true
    //setIsUser(true);
  }, []);

  useEffect(() => {
    document.title = `WikiWise | ${match.params.username}`;
  }, []);

  useEffect(() => {
    const fetchedUserData = {
      username: 'JohnDoe123',
      email: 'johndoe@example.com',
      joinedDate: '2021-01-01',
      bio: 'A passionate writer and nature enthusiast.',
      contributions: [
        { title: 'Peregrine Falcon', link: '/articles/peregrine-falcon' },
        { title: 'Himalayan Monal', link: '/articles/himalayan-monal' },
      ],
    };

    setUserData(fetchedUserData);
  }, [match.params.username]);

  useEffect(() => {
    axios.get(`${endpoint}/users/username/${match.params.username}`)
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
        setError(true);
      });
  }, [match.params.username]);

  if (loading) return <div className="user-profile-page">Loading...</div>;
  if (error) return <div className="user-profile-page">Error: {error}</div>;

  return (
    <div className="user-profile-page">
      {userData && (
        <div className="user-profile-container">
          <div className="user-info">
            <div className="user-info-subcontainer">
              <h2>{userData.username}</h2>
              {isUser && <a href={`/user/${userData.username}/edit`}>Edit Profile</a>}
            </div>  
            <p>Email: {userData.email}</p>
            <p>Joined: {new Date(userData.joinedDate).toLocaleDateString()}</p>
            <p>Bio: {userData.bio}</p>
          </div>
          <div className="user-contributions">
            <h3>Contributions</h3>
            <ul>
              {userData.contributions.map((article, index) => (
                <li key={index}>
                  <a href={article.link}>{article.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;