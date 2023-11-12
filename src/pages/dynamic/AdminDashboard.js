import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/AdminDashboard.css';
import LogsSection from '../../components/LogsSection';

const AdminDashboard = ({ endpoint, title, csrfToken }) => {
    const [logs, setLogs] = useState([]);
    const [logsLoading, setLogsLoading] = useState(false);
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

    return (
        <div className="admin-dashboard">
            <h1 className="admin-head">Admin Dashboard</h1>

            <LogsSection
                handleSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                fetchLogs={fetchLogs}
                logsLoading={logsLoading}
                logs={logs}
                logsError={logsError}
            />
        </div>
    );
};

export default AdminDashboard;