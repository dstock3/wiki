import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-subcontainer">
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li><Link to="/about">About WikiWise</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contribute</h4>
          <ul>
            <li><Link to="/contribute">How to Contribute</Link></li>
            <li><Link to="/donate">Donate</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-copyright">
        © {new Date().getFullYear()} WikiWise, All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
