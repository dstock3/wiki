import { useEffect } from 'react';
import SideMenu from "../../components/SideMenu";
import "../../styles/ContactPage.css"

const ContactPage = ({title, contact}) => {
  useEffect(() => {
    document.title = `${title} | Contact Us`;
  }, [title]);

  return (
    <div className="contact-page">
      <SideMenu />
      <div className="contact-container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Whether you have a question, suggestion, or simply want to give us some feedback, feel free to reach out.</p>
  
          <h2>Email</h2>
          <p>You can contact us directly at: <a href={`mailto:${contact}`}>{contact}</a></p>
  
          <h2 className="contact-head">Contact Form</h2>
          <form className="contact-form">
            <div className="contact-form-container">
              <div className="contact-form-group">
                  <label className="name-label" htmlFor="name">Name</label>
                  <input className="name-input" type="text" id="name" name="name" />
              </div>
              
              <div className="contact-form-group">
                  <label className="email-label" htmlFor="email">Email</label>
                  <input className="email-input" type="email" id="email" name="email" />
              </div>
            </div>

            <div className="contact-form-group message-form-group">
                <label className="message-label" htmlFor="message">Message</label>
                <textarea className="message-textarea" id="message" name="message" rows="5"></textarea>
            </div>
            
            <button class="contact-button" type="submit">Submit</button>
          </form>
      </div>
    </div>
  );
};
  
export default ContactPage;