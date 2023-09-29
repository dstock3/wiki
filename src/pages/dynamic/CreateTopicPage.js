import React, { useState, useEffect } from 'react';
import '../../styles/CreateTopicPage.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateTopicPage = ({ match, title, endpoint, csrfToken }) => {
    const [topicTitle, setTopicTitle] = useState('');
    const [content, setContent] = useState('');
    const history = useHistory();

    useEffect(() => {
        document.title = `${title} | Create Topic`;
    }, [title]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const topicEndpoint = `${endpoint}/${match.params.articleId}/topics`;
        axios.post(topicEndpoint, { title: topicTitle, content: content }, {
            headers: {
                'csrf-token': csrfToken
            }
        })
        .then(response => {
            history.push(`/${match.params.portalid}/article/${match.params.articleid}/talk`);
            console.log('Topic created successfully:', response.data);
        })
        .catch(error => {
            console.error('Error creating topic:', error);
        });
    };

    return (
        <div className="create-topic-page">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="topic-title">Topic Title:</label>
                    <input 
                        type="text" 
                        id="topic-title" 
                        value={topicTitle} 
                        onChange={(e) => setTopicTitle(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="initial-post">Initial Post:</label>
                    <textarea 
                        id="initial-post" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Create Topic</button>
            </form>
        </div>
    );
}

export default CreateTopicPage;