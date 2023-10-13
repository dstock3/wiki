import React, { useEffect, useState } from 'react';
import '../../styles/EditUserPage.css';
import axios from 'axios';
import Loading from '../../components/Loading';
import ReactQuill from 'react-quill';

const EditUserPage = ({ match, endpoint, title, csrfToken }) => {
  const [userData, setUserData] = useState({
    email: '',
    bio: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    document.title = `${title} | Edit User`;

    axios.get(`${endpoint}/users/username/${match.params.username}`, { withCredentials: true })
      .then(response => {
        setUserData(response.data.user);
        setIsUser(response.data.isOwnProfile);
        setLoading(false);
      })
      .catch(err => {
        console.error(err.message);
        setLoading(false);
      });

  }, [title, match.params.username, endpoint]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const config = {
      withCredentials: true,
      headers: { 'csrf-token': csrfToken }
    }
    
    axios.put(`${endpoint}/users/${userData._id}`, userData, config)
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

  if (!isUser) return (
    <div className="edit-user-page">
      <h2>Unauthorized</h2>
      <p>You are not authorized to view this page.</p>
    </div>
  );
  
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
          <ReactQuill
            style={{ backgroundColor: "white" }}
            value={userData.bio}
            onChange={(value) => setUserData(prevState => ({ ...prevState, bio: value }))}
            className="bio-user-input"
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