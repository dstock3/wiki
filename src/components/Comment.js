import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/textParsers';
import axios from 'axios';
import DOMPurify from 'dompurify';

const Comment = ({
    index,
    comment,
    endpoint,
    currentUserId,
    articleAuthorId,
    topicId,
    articleId,
    onDeleteSuccess,
    onEditSuccess,
    csrfToken
}) => {
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [error, setError] = useState('');

    const isAuthor = comment.authorId === currentUserId;
    const canDelete = isAuthor || articleAuthorId === currentUserId;

    const handleDelete = async () => {
        const config = {
            withCredentials: true,
            headers: { 'csrf-token': csrfToken },
        };
        try {
            await axios.delete(`${endpoint}/talk/${articleId}/topics/${topicId}/comments/${comment._id}`, config);
            onDeleteSuccess(comment._id);
        } catch (error) {
            setError("Error deleting comment: " + (error.response?.data?.error || error.message));
        }
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleSave = async () => {
        const config = {
            withCredentials: true,
            headers: { 'csrf-token': csrfToken },
        };
        try {
            const response = await axios.put(`${endpoint}/talk/${articleId}/topics/${topicId}/comments/${comment._id}`, { content: editedContent }, config);
            onEditSuccess(comment._id, response.data.updatedContent); // You need to implement this in the parent component
            setEditMode(false);
        } catch (error) {
            setError("Error updating comment: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="comment" id={`comment-${index}`}>
            <span className="comment-author">
                <Link to={`/user/${comment.authorId}`}>{comment.author}</Link>:
            </span>
            {editMode ? (
                <textarea
                    className="comment-edit-textarea"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                />
            ) : (
                <span className="comment-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.content) }} />
            )}
            <div className="comment-date">{formatDate(comment.date)}</div>
            {error && <div className="error">{error}</div>}
            {isAuthor && !editMode && (
                <button onClick={handleEditToggle} className="comment-edit-button">Edit</button>
            )}
            {canDelete && !editMode && (
                <button onClick={handleDelete} className="comment-delete-button">Delete</button>
            )}
            {editMode && (
                <>
                    <button onClick={handleSave} className="comment-save-button">Save</button>
                    <button onClick={handleEditToggle} className="comment-cancel-button">Cancel</button>
                </>
            )}
        </div>
    );
};

export default Comment;