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
    csrfToken,
    isAdmin
}) => {
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [error, setError] = useState('');

    const isAuthor = comment.authorId === currentUserId;
    const canDelete = isAuthor || articleAuthorId === currentUserId;

    const handleDelete = async () => {
        try {
            await axios.delete(`${endpoint}/talk/${articleId}/topics/${topicId}/comments/${comment._id}?_csrf=${encodeURIComponent(csrfToken)}`, {
                withCredentials: true,
            });
            onDeleteSuccess(comment._id);
        } catch (error) {
            setError("Error deleting comment: " + (error.response?.data?.error || error.message));
        }
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `${endpoint}/talk/${articleId}/topics/${topicId}/comments/${comment._id}`,
                { content: editedContent, _csrf: csrfToken },
                { withCredentials: true }
            );
            
            const updatedComment = response.data;
            onEditSuccess(topicId, updatedComment);
            setEditMode(false);
        } catch (error) {
            setError("Error updating comment: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="comment" id={`comment-${index}`}>
            <div className="comment-content-container">
                    <span className="comment-author">
                        <Link to={`/wiki/user/${comment.author}`}>{comment.author}</Link>:
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
            </div>

            <div className="comment-info-container">
                <div className="comment-info">
                    <div className="comment-date">Posted on {formatDate(comment.date)}</div>
                    {error && <div className="comment-error">{error}</div>}
                </div>

                <div className="comment-button-container">
                    {(isAuthor || isAdmin) && !editMode && (
                        <button onClick={handleEditToggle} className="comment-edit-button">Edit</button>
                    )}
                    {(canDelete || isAdmin) && !editMode && (
                        <button onClick={handleDelete} className="comment-delete-button">Delete</button>
                    )}
                    {editMode && (
                        <>
                            <button onClick={handleSave} className="comment-save-button">Save</button>
                            <button onClick={handleEditToggle} className="comment-cancel-button">Cancel</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;