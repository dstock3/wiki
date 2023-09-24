import React, { useState, useEffect } from 'react';
import '../../styles/CreateAccountPage.css';

const CreateAccountPage = ({endpoint, title}) => {
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        document.title = `${title} | Create Account`;
    }, [title]);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

const handleSubmit = (event) => {
  event.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setMessage('Passwords do not match');
    setIsError(true);
    return;
  }

  fetch(`${endpoint}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        setMessage(data.error);
        setIsError(true);
      } else {
        setMessage('User created successfully');
        setIsError(false);
        window.location.href = '/login';
      }
    })
    .catch((error) => {
      setMessage('An error occurred');
      setIsError(true);
    });
};

    return (
        <div className="create-account-page">
            <h2>Create an Account</h2>
            {message && <div className={isError ? 'error-message' : 'success-message'}>{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        className="username-input" 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        className="email-input" 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="password-input"   
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className="confirm-password-input" 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <button className="create-account-button" type="submit">Create Account</button>
            </form>
            <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
    );
};

export default CreateAccountPage;