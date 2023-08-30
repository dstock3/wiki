import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideMenu.css'; 

const SideMenu = () => {
  return (
    <div className="side-menu-container">
      <h3>Navigation</h3>
      <ul>
        <li><Link to="/">Main page</Link></li>
        <li><Link to="/featured">Featured content</Link></li>
        <li><Link to="/current-events">Current events</Link></li>
      </ul>
      <h3>Project</h3>
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/donate">Donate</Link></li>
      </ul>
      <h3>Other</h3>
      <ul>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/portals">Portals</Link></li>
      </ul>
    </div>
  );
};

export default SideMenu;