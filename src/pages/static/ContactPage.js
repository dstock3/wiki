import { useEffect } from 'react';
import SideMenu from "../../components/SideMenu";
import "../../styles/ContactPage.css";

const ContactPage = ({ endpoint, title, contact }) => {
    useEffect(() => {
        document.title = `${title} | Contact Us`;
    }, [title]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name: event.target.name.value,
            email: event.target.email.value,
            subject: event.target.subject.value,
            message: event.target.message.value,
        };

        try {
            const response = await fetch(`${endpoint}/contact/send-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Message sent successfully!');
                event.target.reset();
            } else {
                const error = await response.text();
                throw new Error(error);
            }
        } catch (error) {
            alert(`Error sending message: ${error.message}`);
        }
    };

    return (
        <div className="contact-page">
            <SideMenu />
            <div className="contact-container">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you! Whether you have a question, suggestion, or simply want to give us some feedback, feel free to reach out.</p>
  
                <h2>Email</h2>
                <p>You can contact us directly at: <a href={`mailto:${contact}`}>{contact}</a></p>
  
                <h2 className="contact-head">Contact Form</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-form-container">
                        <div className="contact-form-group">
                            <label className="name-label" htmlFor="name">Name</label>
                            <input className="name-input" type="text" id="name" name="name" required />
                        </div>
                        
                        <div className="contact-form-group">
                            <label className="email-label" htmlFor="email">Email</label>
                            <input className="email-input" type="email" id="email" name="email" required />
                        </div>

                        <div className="contact-form-group">
                            <label className="subject-label" htmlFor="subject">Subject</label>
                            <input className="subject-input" type="text" id="subject" name="subject" required />
                        </div>
                    </div>

                    <div className="contact-form-group message-form-group">
                        <label className="message-label" htmlFor="message">Message</label>
                        <textarea className="message-textarea" id="message" name="message" rows="5" required></textarea>
                    </div>
                    
                    <button className="contact-button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage