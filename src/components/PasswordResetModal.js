import { useState } from 'react';

const PasswordResetModal = ({ isOpen, onClose, onSubmit, user }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            onSubmit(newPassword, user._id);
            setErrorMessage('');
        } else {
            setErrorMessage("Passwords do not match. Please try again.");
        }
    };

    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => {
                        onClose();
                        setErrorMessage(''); 
                    }}>&times;</span>
                    <h2>Reset Password for {user.username}</h2>
                    {errorMessage && <p className="pw-error-message">{errorMessage}</p>}
                    <form className="reset-pw-form" onSubmit={handleSubmit}>
                        <div className="reset-pw-form-group">
                            <label className="reset-pw-label">New Password:</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="reset-pw-input"
                            />
                        </div>
                        <div className="reset-pw-form-group">
                            <label className="reset-pw-label">Confirm New Password:</label>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="reset-pw-input"
                            />
                        </div>
                        <button className="reset-pw-button" type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default PasswordResetModal;