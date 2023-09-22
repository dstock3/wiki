import SideMenu from '../components/SideMenu';
import '../styles/AboutPage.css'

const AboutPage = ({title, contact}) => {
    return (
      <div className="about-page">
        <SideMenu />
        <main className="about-container">
            <h1>About This Platform</h1>
            <p>Welcome to {title}, a user-driven community committed to curating and disseminating exhaustive articles on a variety of subjects.</p>

            <h2>User Contributions</h2>
            <p>Our platform thrives on the collective contributions of its users. Anyone can contribute by editing existing articles or creating new ones.</p>

            <h2>Discussion and Collaboration</h2>
            <p>Each article comes with an associated talk page, allowing for constructive discussion, feedback, and collaborative editing.</p>

            <h2>Quality and Reliability</h2>
            <p>We aim to be a reliable source of information by encouraging citations and references in all articles.</p>

            <h2>Contact</h2>
            
            <p>Have questions or suggestions? Feel free to reach out to us at: <a href={`mailto:${contact}`}>{contact}</a></p>
        </main>
      </div>
    );
  };
  
  export default AboutPage;
  