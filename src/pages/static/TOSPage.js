import React, { useEffect } from 'react';
import SideMenu from '../../components/SideMenu';
import '../../styles/TOSPage.css';

const TOSPage = ({title, contact}) => {
  useEffect(() => {
    document.title = `${title} | Terms of Service`;
  }, [title]);

  return (
    <div className="tos-page">
      <SideMenu />
      <div className="tos-container">
        <h1>Terms of Service</h1>
        
        <h2>Acceptance of Terms</h2>
        <p>By accessing and using {title} ("the Service"), you agree to comply with and be bound by these Terms of Service.</p>
        
        <h2>User Conduct</h2>
        <p>You agree to not engage in any activity that interferes with or disrupts the Service.</p>
        
        <h2>Content Policy</h2>
        <p>All content uploaded or otherwise submitted to the Service is the responsibility of the user who submitted it.</p>

        <h2>Termination</h2>
        <p>We reserve the right to terminate or suspend accounts that violate these Terms of Service.</p>

        <h2>Changes to Terms</h2>
        <p>We may modify these Terms of Service at any time. Your continued use of the Service constitutes your agreement to the updated terms.</p>

        <h2>Contact</h2>
        <p>If you have any questions about these Terms, please contact us at <a href={`mailto:${contact}`}>{contact}</a>.</p>
      </div>
    </div>
  );
};

export default TOSPage;