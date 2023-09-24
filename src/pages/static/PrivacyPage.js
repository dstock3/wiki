import React, { useEffect }  from 'react';
import SideMenu from '../../components/SideMenu';
import '../../styles/PrivacyPage.css';

const PrivacyPage = ({title, contact}) => {
  useEffect(() => {
    document.title = `${title} | Privacy Policy`;
  }, [title]);

  return (
    <div className="privacy-page">
      <SideMenu />
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        
        <h2>Information We Collect</h2>
        <p>We collect personal information that you voluntarily provide when you use {title}, such as your name and email address.</p>
        
        <h2>How We Use Your Information</h2>
        <p>Your information is used to manage your account, provide customer support, and for other purposes described in this policy.</p>

        <h2>Cookies</h2>
        <p>We use cookies to enhance your experience on our site. You can disable cookies in your browser, but some features of the site may not function properly as a result.</p>

        <h2>Data Security</h2>
        <p>We take reasonable measures to protect your personal information from unauthorized access.</p>

        <h2>Third-Party Services</h2>
        <p>We may share your information with third-party services that perform services on our behalf.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

        <h2>Contact</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href={`mailto:${contact}`}>{contact}</a>.</p>
      </div>
    </div>
  );
};

export default PrivacyPage;