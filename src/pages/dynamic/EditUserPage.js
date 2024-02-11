import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/EditUserPage.css';
import axios from 'axios';
import Loading from '../../components/Loading';
import ReactQuill from 'react-quill';

const EditUserPage = ({ match, history, endpoint, title, csrfToken }) => {
  const [userData, setUserData] = useState({
    email: '',
    bio: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.title = `${title} | Edit User`;

    axios.get(`${endpoint}/users/username/${match.params.username}`, { withCredentials: true })
      .then(response => {
        setUserData(response.data.user);
        setIsUser(response.data.isOwnProfile);
        setIsAdmin(response.data.user.isAdmin);
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
  
    if (userData.password && confirmPassword !== userData.password) {
      setError([{ msg: 'Password and Confirm Password do not match.' }]);
      return;
    }
  
    const config = {
      withCredentials: true,
      headers: { 'csrf-token': csrfToken }
    }

    axios.put(`${endpoint}/users/${userData._id}`, userData, config)
    .then(response => {
      console.log(config)
      history.push(`/wiki/user/${userData.username}`);
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          history.push('/wiki/login');
        } else if (error.response.data.errors) {
          setError(error.response.data.errors);
        } else {
          setError([{ msg: 'An error occurred while updating the profile.' }]);
        }
      } else if (error.request) {
        setError([{ msg: 'The request was made but no response was received.' }]);
      } else {
        setError([{ msg: `Error setting up the request: ${error.message}` }]);
      }
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    
    const userConfirmation = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
  
    if (!userConfirmation) {
      return;
    }

    const config = {
      withCredentials: true,
      headers: { 'csrf-token': csrfToken }
    }

    axios.delete(`${endpoint}/users/${userData._id}`, config)
      .then(response => {
        history.push('/');
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/wiki/login');
        } else if (error.response.data.errors) {
          setError(error.response.data.errors);
        } else {
          setError([{ msg: 'An unknown error occurred.' }]);
        }
      });
  }

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
        {error && error.map((err, index) => <p className="user-edit-error" key={index}>{err.msg}</p>)}
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
        <div className="input-group">
          <label className="user-label" htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            className="user-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="profile-button-container">
          <button className="user-delete-button" type="button" onClick={handleDelete} >Delete Account</button>
          <button className="user-submit-button" type="submit">Update Profile</button>
        </div>
      </form>
      {isAdmin && <div className="admin-link-container">
        <Link className="admin-link" to="/wiki/admin">Admin Dashboard</Link>
      </div>}
    </div>
  );
};

export default EditUserPage;