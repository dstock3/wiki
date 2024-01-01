import { useState } from 'react';

const PasswordResetModal = ({ isOpen, onClose, onSubmit, user }) => {
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newPassword, user._id);
    };

    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Reset Password for {user.username}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default PasswordResetModal;