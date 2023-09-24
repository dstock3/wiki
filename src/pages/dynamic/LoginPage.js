import React, { useState, useEffect } from 'react';
import '../../styles/LoginPage.css';

const LoginPage = ({endpoint, title}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        document.title = `${title} | Log In`;
    }, [title]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch(`${endpoint}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
          credentials: 'include', 
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              setMessage(data.error);
              setIsError(true);
            } else {
              setMessage('Logged in successfully');
              setIsError(false);
              window.location.href = '/'; 
            }
            console.log(data);
          })
          .catch((error) => {
            setMessage('An error occurred');
            setIsError(true);
          });
    };
      
    return (
        <div className="login-page">
            <h2>Log In to WikiWise</h2>
            {message && <div className={isError ? 'error-message' : 'success-message'}>{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        className='username-input' 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        className='password-input' 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button className="login-button" type="submit">Log In</button>
            </form>
            <p>
                Don't have an account? <a href="/create-account">Create one</a>
            </p>
        </div>
    );
};

export default LoginPage;