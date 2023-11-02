import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/textParsers';
import axios from 'axios';

const Comment = ({ index, comment, endpoint, currentUserId, articleAuthorId, topicId, articleId, onDeleteSuccess, csrfToken }) => {
    const isAuthor = comment.authorId === currentUserId;
    const canDelete = isAuthor || articleAuthorId === currentUserId;

    useEffect(() => {
        console.log("articleId" + articleId)
    }, []);


    const handleDelete = async () => {
        const config = {
            withCredentials: true,
            headers: { 'csrf-token': csrfToken },
        };
        try {
            const response = await axios.delete(`${endpoint}/talk/${articleId}/topics/${topicId}/comments/${comment._id}`, config);
            onDeleteSuccess(comment._id);
        } catch (error) {
            console.error("Error deleting comment:", error.response?.data?.error || error.message);
        }
    };


    const handleEdit = () => {
        // trigger a redirect to a page with a form for editing the comment.
    };

    return (
        <div className="comment" id={`comment-${index}`}>
            <span className="comment-author">
                <Link to={`/user/${comment.authorId}`}>{comment.author}</Link>:
            </span>
            <span className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }} />
            <div className="comment-date">{formatDate(comment.date)}</div>
            {isAuthor && (
                <button onClick={handleEdit} className="comment-edit-button">Edit</button>
            )}
            {canDelete && (
                <button onClick={handleDelete} className="comment-delete-button">Delete</button>
            )}
        </div>
    );
};

export default Comment;