import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = ({title}) => {
  return (
    <div className="footer-container">
      <div className="footer-subcontainer">
        <div className="footer-section">
          <div className="footer-subsection">
            <h4>About</h4>
            <ul>
              <li><Link to="/wiki/about">About {title}</Link></li>
              <li><Link to="/wiki/contact">Contact Us</Link></li>
              <li><Link to="/wiki/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-subsection">
            <h4>Contribute</h4>
            <ul>
              <li><Link to="/wiki/contribute">How to Contribute</Link></li>
              <li><Link to="/wiki/donate">Donate</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-subsection">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/wiki/terms">Terms of Use</Link></li>
              <li><Link to="/wiki/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        © {new Date().getFullYear()} {title}, All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
