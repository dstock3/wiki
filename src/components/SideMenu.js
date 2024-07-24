import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideMenu.css'; 

const SideMenu = () => {
  return (
    <div className="side-menu-container">
      <h3>Navigation</h3>
      <ul>
        <li><Link to="/wiki/">Main page</Link></li>
        <li><Link to="/wiki/portals">Portals</Link></li>
        <li><Link to="/wiki/about">About</Link></li>
        <li><Link to="/wiki/blog">Blog</Link></li>
        <li><Link to="/wiki/donate">Donate</Link></li>
      </ul>
    </div>
  );
};

export default SideMenu;