import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import axios from 'axios';

const AdminDashboard = ({ endpoint, title, csrfToken }) => {
    const [logs, setLogs] = useState([]);
    const [logsLoading, setLogsLoading] = useState(true);
    const [logsError, setLogsError] = useState('');
    
    useEffect(() => {
        document.title = `${title} | Admin Dashboard`;
    }, [title]);

    const fetchLogs = async () => {
        axios.get(`${endpoint}/logs/`, { withCredentials: true })
        .then(response => {
            console.log(response.data);
            setLogs(response.data.logs);
            setLogsLoading(false);
        })
        .catch(err => {
            setLogsError(err.message);
            setLogsLoading(false);
        });    
    };

    const fetchErrorLogs = async () => {
        axios.get(`${endpoint}/logs/error`, { withCredentials: true })
        .then(response => {
            console.log(response.data);
            setLogs(response.data.errorLogs);
            setLogsLoading(false);
        })
        .catch(err => {
            setLogsError(err.message);
            setLogsLoading(false);
        });    
    }

    return (
        <div className="admin-dashboard">
            <h1 className="admin-head">Admin Dashboard</h1>

            <section className="logs-section">
                <div className="logs-button-container">
                    <button className="logs-button" onClick={fetchLogs}>Retrieve All Logs</button>
                    <button className="logs-button" onClick={fetchErrorLogs}>Retreive Error Logs</button>
                </div>
                
                {logsLoading ? (
                    <Loading loading={logsLoading} />
                ) : logsError ? (
                    <p className="log-error">Error: {logsError}</p>
                ) : (
                    <div className="">
                        <h2>Logs</h2>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AdminDashboard;
