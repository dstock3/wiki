import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/textParsers';

const Comment = ({ index, comment, currentUserId, articleAuthorId }) => {
    const isAuthor = comment.authorId === currentUserId;
    const canDelete = isAuthor || articleAuthorId === currentUserId;

    return (
        <div className="comment" id={`comment-${index}`}>
            <span className="comment-author">
                <Link to={`/user/${comment.authorId}`}>{comment.author}</Link>:
            </span>
            <span className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }} />
            <div className="comment-date">{formatDate(comment.date)}</div>
            {isAuthor && (
                <button className="comment-edit-button">Edit</button>
            )}
            {canDelete && (
                <button className="comment-delete-button">Delete</button>
            )}
        </div>
    );
};

export default Comment;