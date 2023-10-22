import React from 'react'
import { Link } from 'react-router-dom'

const Comment = ({index, comment}) => {
    const formattedDate = new Date(comment.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <div className="comment" id={`topic-${index}`}>
            <span className="comment-author">
                <Link to={`/user/${comment.author}`}>{comment.author}</Link>:
            </span>
            <span className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }} />
            <div className="comment-date">{formattedDate}</div>
        </div>
    )
}

export default Comment