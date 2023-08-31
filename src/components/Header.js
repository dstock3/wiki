import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-subcontainer">
        <div className="header-menu">
          {/* menu icon here */}
          Menu
        </div>
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
        <Link to="/create-account">
          <div className="create-account-button">Create Account</div>
        </Link>
        <Link to="/login">
          <div className="login-button">Login</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;