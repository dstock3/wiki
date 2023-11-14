import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

const UsersSection = ({ endpoint, csrfToken }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${endpoint}/admin/users`, { withCredentials: true })
            .then(response => {
                setUsers(response.data.users);
                setLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setError(err.message);
                setLoading(false);
            });
    }, [endpoint]);

    const handleDeleteUser = async (userId) => {
        // deletion logic
    };

    const handleBanUser = async (userId) => {
        // ban logic
    };

    const handleResetPassword = async (userId) => {
        // password reset 
    };

    if (loading) {
        return <Loading loading={loading} />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="users-section">
            <h2>Manage Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Joined Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.joinedDate).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                <button onClick={() => handleBanUser(user._id)}>Ban</button>
                                <button onClick={() => handleResetPassword(user._id)}>Reset Password</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersSection;