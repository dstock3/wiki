import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import SearchBar from './SearchBar';
import axios from 'axios';

const Header = ({ endpoint, isLoggedIn, setIsLoggedIn }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get(`${endpoint}/users/status`, { withCredentials: true })
      .then(response => {
        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
          setUsername(response.data.username);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(error => {
        setIsLoggedIn(false);
        console.error("Error fetching user status:", error);
      });
  }, []);

  const handleLogout = () => {
    axios.post(`${endpoint}/users/logout`, {}, { withCredentials: true })
      .then(response => {
        setIsLoggedIn(false);
      })
      .catch(error => {
        console.error("Error during logout:", error);
      });
  }

  return (
    <div className="header-container">
      <div className="header-subcontainer">
        <div className="header-logo">
          <Link to="/">
            {/* logo here */}
            <img src="your-logo-here.png" alt="Site Logo" />
          </Link>
        </div>
        <div className="header-search">
          <SearchBar />
        </div>
      </div>

      <div className="header-auth">

        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className="logout-button">
              <div className="logout-link">Logout</div>
            </button>
            <Link to={`/user/${username}/edit`}>
              <div className="account-link">Account</div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/create-account">
              <div className="create-account-link">Create Account</div>
            </Link>
            <Link to="/login">
              <div className="login-link">Login</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;