import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/DeleteArticle.css';

const DeleteArticle = ({ isOpen, onClose, onConfirm, msg }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <span>Are you sure you want to delete this {msg}? This action cannot be undone.</span>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteArticle;