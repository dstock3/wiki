import React, { useEffect, useState } from 'react';
import '../styles/UserProfilePage.css'

const UserProfilePage = ({ match }) => {
  const [userData, setUserData] = useState(null);
  const [isUser, setIsUser] = useState(false);

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