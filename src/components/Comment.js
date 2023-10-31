import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/textParsers'

const Comment = ({index, comment}) => {
    return (
        <div className="comment" id={`topic-${index}`}>
            <span className="comment-author">
                <Link to={`/user/${comment.author}`}>{comment.author}</Link>: 
            </span>
            <span className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }} />
            <div className="comment-date">{formatDate(comment.date)}</div>
        </div>
    )
}

export default Comment