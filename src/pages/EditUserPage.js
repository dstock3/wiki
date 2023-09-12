import React, { useEffect, useState } from 'react';
import '../styles/EditUserPage.css';

const EditUserPage = ({ match, location }) => {
  const [userData, setUserData] = useState({
    email: '',
    bio: ''
  });

  const isCreatePage = location.pathname.includes('/user/create');

  useEffect(() => {
    document.title = `WikiWise | ${isCreatePage ? 'Create User' : 'Edit ' + match.params.username}`;

    if (!isCreatePage) {
        // fetch user data from backend
      const fetchedUserData = {
        email: 'johndoe@example.com',
        bio: 'A passionate writer and nature enthusiast.'
      };
      setUserData(fetchedUserData);
    }
  }, [match.params.username, location.pathname]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send the modified userData to backend
    console.log("Updated user data:", userData);
  };

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