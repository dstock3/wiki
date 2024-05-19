import React from 'react';
import '../styles/Footer.css';
import { ScrollToTopLink } from '../utils/ScrollToTop';

const Footer = ({ title }) => {
  return (
    <div className="footer-container">
      <div className="footer-subcontainer">
        <div className="footer-section">
          <div className="footer-subsection">
            <h4>About</h4>
            <ul>
              <li><ScrollToTopLink to="/wiki/about">About {title}</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/wiki/contact">Contact Us</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/wiki/disclaimer">Disclaimer</ScrollToTopLink></li>
            </ul>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-subsection">
            <h4>Contribute</h4>
            <ul>
              <li><ScrollToTopLink to="/wiki/contribute">How to Contribute</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/wiki/donate">Donate</ScrollToTopLink></li>
            </ul>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-subsection">
            <h4>Legal</h4>
            <ul>
              <li><ScrollToTopLink to="/wiki/terms">Terms of Use</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/wiki/privacy">Privacy Policy</ScrollToTopLink></li>
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