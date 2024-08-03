import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/AdminDashboard.css';
import LogsSection from '../../components/LogsSection';
import UsersSection from '../../components/UsersSection';
import BlogSection from '../../components/BlogSection';

const AdminDashboard = ({ endpoint, title, csrfToken, contact }) => {
    const [logs, setLogs] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [logsLoading, setLogsLoading] = useState(false);
    const [logsError, setLogsError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        document.title = `${title} | Admin Dashboard`;
    }, [title]);

    useEffect(() => {
        axios.get(`${endpoint}/users/admin`, { withCredentials: true })
        .then(response => {
            if (response.data.isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        })
        .catch(err => {
            console.error(err.message);
            setIsAdmin(false);
        });
    }, [endpoint]);

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

    if (!isAdmin) {
        return (
            <div className="admin-dashboard">
                <h1 className="admin-head">Admin Dashboard</h1>
                <div className="admin-error-container">
                    <div className="admin-error">You are not an admin.</div>
                    <p>For technical support, please contact <a href={`mailto:${contact}`}>{contact}</a>.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <h1 className="admin-head">Admin Dashboard</h1>

            <div className="admin-section-container">
                <UsersSection 
                    endpoint={endpoint}
                    csrfToken={csrfToken} 
                />

                <LogsSection
                    handleSearch={handleSearch}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    fetchLogs={fetchLogs}
                    logsLoading={logsLoading}
                    logs={logs}
                    logsError={logsError}
                />

                <BlogSection />
            </div>
        </div>
    );
};

export default AdminDashboard;