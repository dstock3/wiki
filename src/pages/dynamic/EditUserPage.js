import React, { useEffect, useState } from 'react';
import '../../styles/EditUserPage.css';
import axios from 'axios';
import Loading from '../../components/Loading';

const EditUserPage = ({ match, location, endpoint, title, csrfToken }) => {
  const [userData, setUserData] = useState({
    email: '',
    bio: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const isCreatePage = location.pathname.includes('/user/create');

  useEffect(() => {
    document.title = `${title} | ${isCreatePage ? 'Create User' : 'Edit ' + match.params.username}`;

    if (!isCreatePage) {
        // fetch user data from backend
      const fetchedUserData = {
        email: 'johndoe@example.com',
        bio: 'A passionate writer and nature enthusiast.'
      };
      setLoading(false);
      setUserData(fetchedUserData);
    }
  }, [title, match.params.username, location.pathname, isCreatePage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const url = isCreatePage 
      ? `/${endpoint}/users/`  
      : `/${endpoint}/users/${match.params.userId}`;
  
    const method = isCreatePage ? 'post' : 'put';
  
    const config = {
      withCredentials: true,
      headers: { 'csrf-token': csrfToken }
    }
  
    axios[method](url, userData, config)
      .then(response => {
        console.log("Response:", response.data);
      })
      .catch(error => {
        console.log("Error:", error.response.data);
        setError(error.response.data.message);
      });
  };

  if (error) return <div className="edit-user-page">Error: {error}</div>;
  if (loading) return <div className="edit-user-page">
    <Loading loading={loading} />
  </div>;

  return (
    <div className="edit-user-page">
      <h2>Edit Profile</h2>
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="user-label" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            className="user-input"
            onChange={handleChange}
          />
        </div>

        <div className="input-group bio-group">
          <label className="user-label" htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={userData.bio}
            className="user-input"
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="input-group">
          <label className="user-label" htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="user-input"
            onChange={handleChange}
          />
        </div>
        
        <button className="user-submit-button" type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditUserPage;