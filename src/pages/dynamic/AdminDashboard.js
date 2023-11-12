import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';
import '../../styles/AdminDashboard.css';

const AdminDashboard = ({ endpoint, title, csrfToken }) => {
    const [logs, setLogs] = useState([]);
    const [logsLoading, setLogsLoading] = useState(true);
    const [logsError, setLogsError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = `${title} | Admin Dashboard`;
    }, [title]);

    const fetchLogs = async (logType = '') => {
        setLogsLoading(true);
        try {
            const response = await axios.get(`${endpoint}/logs/${logType}`, { withCredentials: true });
            setLogs(response.data.logs || response.data.errorLogs || response.data.infoLogs || response.data.warnLogs || response.data.searchResults);
        } catch (err) {
            setLogsError(err.message);
        }
        setLogsLoading(false);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery) {
            fetchLogs(`search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const renderLogEntry = (log) => {
        let message = log.message;
        if (typeof message === 'object') {
            message = JSON.stringify(message, null, 2);
        }
    
        return (
            <li className="log-line-item" key={log.timestamp || log._id || Math.random()}>
                <div className="log-level">
                    <strong>Level:</strong> {log.level || 'N/A'}
                </div>
                <div className="log-message">
                    <strong>Message:</strong> {message || 'N/A'}
                </div>
                <div className="log-service">
                    <strong>Service:</strong> {log.service || 'N/A'}
                </div>
            </li>
        );
    };

    return (
        <div className="admin-dashboard">
            <h1 className="admin-head">Admin Dashboard</h1>

            <section className="logs-section">
                <div className="logs-dashboard">
                    <div className="logs-button-container">
                        <button className="logs-button" onClick={() => fetchLogs()}>Retrieve All Logs</button>
                        <button className="logs-button" onClick={() => fetchLogs('error')}>Retrieve Error Logs</button>
                        <button className="logs-button" onClick={() => fetchLogs('info')}>Retrieve Info Logs</button>
                        <button className="logs-button" onClick={() => fetchLogs('warn')}>Retrieve Warn Logs</button>
                    </div>

                    <form onSubmit={handleSearch} className="log-search-form">
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="search-logs-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="search-logs-button" type="submit">Search</button>
                    </form>
                </div>

                {logsLoading ? (
                    <Loading loading={logsLoading} />
                ) : logsError ? (
                    <p className="log-error">Error: {logsError}</p>
                ) : (
                    <div className="logs-display">
                        <h2>Logs</h2>
                        <ul className="logs-list">
                            {logs.map(log => renderLogEntry(log))}
                        </ul>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AdminDashboard;