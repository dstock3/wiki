import React, { useState, useEffect } from 'react';
import '../styles/LoginPage.css';

const LoginPage = ({endpoint}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        document.title = `WikiWise | Log In`;
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here (e.g., API call, token storage)
        console.log(`Logging in user: ${username}`);
    };

    return (
        <div className="login-page">
            <h2>Log In to WikiWise</h2>
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