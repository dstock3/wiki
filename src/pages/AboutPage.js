import SideMenu from '../components/SideMenu';
import '../styles/AboutPage.css'

const AboutPage = () => {
    return (
      <div className="about-page">
        <SideMenu />
        <div className="about-container">
            <h1>About This Platform</h1>
            <p>Welcome to our wiki platform, a user-driven community committed to curating and disseminating exhaustive articles on a variety of subjects.</p>

            <h2>User Contributions</h2>
            <p>Our platform thrives on the collective contributions of its users. Anyone can contribute by editing existing articles or creating new ones.</p>

            <h2>Discussion and Collaboration</h2>
            <p>Each article comes with an associated talk page, allowing for constructive discussion, feedback, and collaborative editing.</p>

            <h2>Quality and Reliability</h2>
            <p>We aim to be a reliable source of information by encouraging citations and references in all articles.</p>

            <h2>Contact</h2>
            {/* I'll need to update this with actual contact info */}
            <p>Have questions or suggestions? Feel free to reach out to us at: <a href="mailto:support@ourwikiplatform.com">support@ourwikiplatform.com</a></p>
        </div>
      </div>
    );
  };
  
  export default AboutPage;
  