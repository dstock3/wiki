import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import PasswordResetModal from './PasswordResetModal';

const UsersSection = ({ endpoint, csrfToken }) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = () => {
        axios.get(`${endpoint}/users/admin/manage`, { withCredentials: true })
        .then(response => {
            setUsers(response.data.users);
            setFilteredUsers(response.data.users); 
            setLoading(false);
        })
        .catch(err => {
            console.error(err.message);
            setError(err.message);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchUsers();
    }, [endpoint]);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = users.filter(user => 
            user.username.toLowerCase().includes(lowercasedQuery) ||
            user.email.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleDeleteUser = async (userId) => {
        if(window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                const response = await axios.delete(`${endpoint}/users/admin/${userId}`, {
                    withCredentials: true,
                    headers: { 'csrf-token': csrfToken }
                });
                console.log(response.data.message);
                fetchUsers(); 
            } catch (err) {
                console.error(err.message);
                alert(err.response?.data?.error || 'Failed to delete user');
            }
        }
    };
    
    const handleBanUser = async (userId) => {
        try {
            const response = await axios.put(`${endpoint}/users/admin/ban/${userId}`, {}, {
                withCredentials: true,
                headers: { 'csrf-token': csrfToken }
            });
            alert(response.data.message);
            fetchUsers(); 
        } catch (err) {
            console.error('Error banning user:', err);
            alert(err.response?.data?.error || 'Failed to ban user');
        }
    };

    const handleUnbanUser = async (userId) => {
        if(window.confirm("Are you sure you want to unban this user?")) {
            try {
                const response = await axios.put(`${endpoint}/users/admin/unban/${userId}`, {}, {
                    withCredentials: true,
                    headers: { 'csrf-token': csrfToken }
                });
                alert(response.data.message);
                fetchUsers(); 
            } catch (err) {
                console.error('Error unbanning user:', err);
                alert(err.response?.data?.error || 'Failed to unban user');
            }
        }
    };

    const handleToggleBan = async (user) => {
        if (user.isBanned) {
            handleUnbanUser(user._id);
        } else {
            handleBanUser(user._id);
        }
    };

    const handleResetPasswordClick = (user) => {
        setSelectedUser(user);
        setIsResetModalOpen(true);
    };
    
    const handleResetPasswordSubmit = async (newPassword, userId) => {
        setIsResetModalOpen(false);
        try {
            const response = await axios.put(`${endpoint}/users/admin/reset-password/${userId}`, { password: newPassword }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'csrf-token': csrfToken
                }
            });
            alert(`Password for ${selectedUser.username} has been reset.`);
        } catch (err) {
            console.error('Error resetting password:', err);
            alert(err.response?.data?.error || 'Failed to reset password');
        }
    };

    if (loading) {
        return <Loading loading={loading} />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <section className="users-section">
                <h2>Manage Users</h2>
                <div className="users-dashboard"> 
                    <form onSubmit={handleSearch} className="user-search-form">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-users-input"
                        />
                        <button type="submit" className="search-users-button">Search</button>
                    </form>
                </div>
                <div className="users-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th className="email">Email</th>
                                <th>Joined Date</th>
                                <th>Banned</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td className="email">{user.email}</td>
                                    <td>{new Date(user.joinedDate).toLocaleDateString()}</td>
                                    <td>{user.isBanned ? "Banned" : "Not Banned"}</td>
                                    <td className="admin-users-button-container">
                                        <button className="user-action-button delete" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                        <button className="user-action-button ban" onClick={() => handleToggleBan(user)}>
                                            {user.isBanned ? "Unban" : "Ban"}
                                        </button>
                                        <button className="user-action-button reset" onClick={() => handleResetPasswordClick(user)}>Reset Password</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <PasswordResetModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onSubmit={handleResetPasswordSubmit}
                user={selectedUser}
            />
        </>
    );
};

export default UsersSection;