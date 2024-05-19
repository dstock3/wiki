import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import SearchBar from './SearchBar';
import axios from 'axios';
import ThemeToggle from './ThemeToggle';
import Logo from '../assets/bolt.svg'

const Header = ({ endpoint, isLoggedIn, setIsLoggedIn, username, setUsername, isDarkTheme, setIsDarkTheme }) => {
  
  const handleLogout = () => {
    axios.post(`${endpoint}/users/logout`, {}, { withCredentials: true })
      .then(response => {
        setIsLoggedIn(false);
        setUsername("");
        window.location.href = "/wiki/";
      })
      .catch(error => {
        console.error("Error during logout:", error);
      });
  }

  return (
    <header className="header-container">
      <div className="header-subcontainer">
        <div className="header-logo">
          <Link to="/wiki/">
            <span className="w-logo">W</span>
            <img className="img-logo" src={Logo} alt="Site Logo" />
          </Link>
        </div>
        <div className="header-search">
          <SearchBar />
        </div>
      </div>

      <div className="header-auth">
        {isLoggedIn ? (
          <>
            <Link to={`/wiki/user/${username}/edit`}>
              <div className="account-link">My Account</div>
            </Link>
            <button onClick={handleLogout} className="logout-button">
              <div className="logout-link">Logout</div>
            </button>
          </>
        ) : (
          <>
            <Link to="/wiki/create-account">
              <div className="create-account-link">Create Account</div>
            </Link>
            <Link to="/wiki/login">
              <div className="login-link">Login</div>
            </Link>
          </>
        )}
        <ThemeToggle isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
      </div>
    </header>
  );
};

export default Header;