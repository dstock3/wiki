import React, { useEffect } from 'react';
import '../styles/ThemeToggle.css';

const ThemeToggle = ({ isDarkTheme, setIsDarkTheme }) => {
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark-theme');
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <div className="theme-toggle">
        <span className="theme-toggle-label">Toggle Theme</span>
        <label className="switch">
            <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
            <span className="slider"></span>
        </label>
    </div>
  );
};

export default ThemeToggle;