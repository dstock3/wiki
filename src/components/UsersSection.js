import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

const UsersSection = ({ endpoint, csrfToken }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${endpoint}/users/admin/manage`, { withCredentials: true })
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
        if(window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                const response = await axios.delete(`${endpoint}/users/admin/${userId}`, {
                    withCredentials: true,
                    headers: { 'csrf-token': csrfToken }
                });
                // Update local state or refetch users to reflect changes
                console.log(response.data.message);
            } catch (err) {
                console.error(err.message);
                // Handle error
            }
        }
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
        <section className="users-section">
            <h2>Manage Users</h2>
            <div className="users-table-container">
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
                                <td className="admin-users-button-container">
                                    <button className ="user-action-button delete" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                    <button className ="user-action-button ban" onClick={() => handleBanUser(user._id)}>Ban</button>
                                    <button className ="user-action-button reset" onClick={() => handleResetPassword(user._id)}>Reset Password</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default UsersSection;