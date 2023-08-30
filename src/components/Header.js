import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-logo">
        <Link to="/">
          {/* logo here */}
          <img src="your-logo-here.png" alt="Site Logo" />
        </Link>
      </div>
      <div className="header-search">
        {/* search bar component */}
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
};

export default Header;