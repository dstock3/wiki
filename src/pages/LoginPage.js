import React, { useState } from 'react';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
            <p>
                Don't have an account? <a href="/create-account">Create one</a>
            </p>
        </div>
    );
};

export default LoginPage;