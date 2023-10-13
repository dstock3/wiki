import React, { useEffect, useState } from 'react';
import '../../styles/UserProfilePage.css'
import axios from 'axios';
import Loading from '../../components/Loading';
import { parseContentToHTML } from '../../utils/textParsers';

const UserProfilePage = ({ match, endpoint, title }) => {
  const [userData, setUserData] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `${title} | ${match.params.username}`;
  }, [title, match.params.username]);


  useEffect(() => {
    axios.get(`${endpoint}/users/username/${match.params.username}`)
      .then(response => {
        setUserData(response.data.user);
        setIsUser(response.data.isOwnProfile);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
        setError(false);
        setLoading(false);
      });

  }, [match.params.username, endpoint]);

  if (loading) return <div className="user-profile-page">
    <Loading loading={loading} />
  </div>;
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
            <div dangerouslySetInnerHTML={{ __html: parseContentToHTML(userData.bio) }} />
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