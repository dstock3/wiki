import SideMenu from "../components/SideMenu";
import "../styles/ContactPage.css"

const ContactPage = () => {
    return (
      <div className="contact-page">
        <SideMenu />
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Whether you have a question, suggestion, or simply want to give us some feedback, feel free to reach out.</p>
    
            <h2>Email</h2>
            <p>You can contact us directly at: <a href="mailto:support@wikiwise.com">support@wikiwise.com</a></p>
    
            <h2>Contact Form</h2>
            <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
            </div>
            
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
            </div>
            
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5"></textarea>
            </div>
            
            <button type="submit">Submit</button>
            </form>
        </div>
      </div>
    );
  };
  
  export default ContactPage;