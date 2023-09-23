import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import SearchBar from './SearchBar';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //check to see if user is logged in
    //if logged in, update state to reflect that
    //setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    //handle logout here
    setIsLoggedIn(false);
  }

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
          <div className="create-account-link">Create Account</div>
        </Link>
        {isLoggedIn ? (
          <a href="/" onClick={handleLogout}>
            <div className="logout-link">Logout</div>
          </a>
        ) : (
          <Link to="/login">
            <div className="login-link">Login</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;