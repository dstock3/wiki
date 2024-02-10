import React, { useState, useEffect } from 'react';
import '../../styles/LoginPage.css';
import { useHistory } from 'react-router-dom';

const LoginPage = ({ endpoint, title, setCsrfToken, setIsLoggedIn, username, setUsername }) => {
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    
    useEffect(() => {
        document.title = `${title} | Log In`;
    }, [title]);

    const getCsrfToken = async () => {
      try {
        const response = await fetch(`${endpoint}/users/get-csrf-token`, { credentials: 'include' });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
  
      fetch(`${endpoint}/users/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
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
            getCsrfToken();
            setIsLoggedIn(true);
            setUsername(data.username);
            setIsError(false);
            history.push('/wiki/');
          }
      })
      .catch((error) => {
          setMessage('An error occurred');
          setIsError(true);
      });
    };

    const handleCapsLock = (e) => {
        setIsCapsLockOn(e.getModifierState('CapsLock'));
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
                        onKeyUp={handleCapsLock}
                        onKeyDown={handleCapsLock}
                        required 
                    />
                </div>
                {isCapsLockOn && (
                    <div className="caps-lock-warning">
                        Caps Lock is on
                    </div>
                )}
                <button className="login-button" type="submit">Log In</button>
            </form>
            <p>
                Don't have an account? <a href="/create-account">Create one</a>
            </p>
        </div>
    );
};

export default LoginPage;