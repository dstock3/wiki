import React, { useEffect, useState } from 'react';
import '../../styles/UserProfilePage.css'
import axios from 'axios';
import Loading from '../../components/Loading';
import { parseContentToComponents } from '../../utils/textParsers';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const UserProfilePage = ({ match, endpoint, title }) => {
  const [userData, setUserData] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `${title} | ${match.params.username}`;
  }, [title, match.params.username]);

  useEffect(() => {
    axios.get(`${endpoint}/users/username/${match.params.username}`, { withCredentials: true })
      .then(response => {
        setUserData(response.data.user);
        setIsUser(response.data.isOwnProfile);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
        setError(error);
        setLoading(false);
      });

  }, [match.params.username, endpoint]);

  if (loading) return <div className="user-profile-page">
    <Loading loading={loading} />
  </div>;
  if (error) return <div className="user-profile-page">Error: {error.message}</div>;

  return (
    <div className="user-profile-page">
      {userData && (
        <div className="user-profile-container">
          <div className="user-info">
            <div className="user-info-subcontainer">
              <h2>{userData.username}</h2>
              {isUser && <Link to={`/wiki/user/${userData.username}/edit`}>Edit Profile</Link>}
            </div>  
            <p>Email: <a href={`mailto:${userData.email}`}>{userData.email}</a></p>
            <p>Joined: {new Date(userData.joinedDate).toLocaleDateString()}</p>
            <div>
              {parseContentToComponents(userData.bio)}
            </div>
          </div>
          <div className="user-contributions">
            <h3>Contributions</h3>
            {userData.contributions.articles.length === 0 && <div className="contributions-msg">No articles yet</div>}
            <ul className="article-list">
              {userData.contributions.articles.map((article, index) => (
                <li key={index}>
                  <Link to={`/wiki/${article.portalId}/article/${article._id}`}>{article.title}</Link>
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