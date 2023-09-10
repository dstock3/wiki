import React, { useEffect, useState } from 'react';
import '../styles/UserProfilePage.css'

const UserProfilePage = ({ match }) => {
  const [userData, setUserData] = useState(null);

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

  return (
    <div className="user-profile-page">
      
      {userData && (
        <div className="user-profile-container">
          <div className="user-info">
            <h2>{userData.username}</h2>
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