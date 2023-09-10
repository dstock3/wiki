import React, { useEffect } from 'react';
import SideMenu from '../components/SideMenu';
import '../styles/DisclaimerPage.css';

const DisclaimerPage = () => {
  useEffect(() => {
    document.title = `WikiWise | Disclaimer`;
  }, []);

  return (
    <div className="disclaimer-page">
      <SideMenu />
      <div className="disclaimer-container">
        <h1>Disclaimer</h1>
        
        <h2>General Information</h2>
        <p>The content provided on WikiWise is for informational purposes only and should not be construed as professional advice.</p>

        <h2>User-Generated Content</h2>
        <p>WikiWise allows users to contribute content. The service is not responsible for the accuracy, completeness, or reliability of any information provided by users. User-contributed content does not necessarily represent the views or policies of WikiWise.</p>
        
        <h2>Accuracy of Information</h2>
        <p>While we strive for accuracy, we cannot guarantee that all information presented is up to date or free of errors.</p>

        <h2>External Links</h2>
        <p>Our site may contain links to external websites. We are not responsible for the content or privacy practices of these external sites.</p>

        <h2>Limitation of Liability</h2>
        <p>We are not liable for any damages arising from the use or inability to use our site.</p>

        <h2>Contact</h2>
        <p>If you have any questions or concerns about this disclaimer, you can contact us at <a href="mailto:support@wikiwise.com">support@wikiwise.com</a>.</p>
      </div>
    </div>
  );
};

export default DisclaimerPage;