import React, { useState, useEffect } from 'react';
import '../../styles/CreateTopicPage.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { modules, formats } from '../../config/quillConfig';

const CreateTopicPage = ({ match, title, endpoint, csrfToken }) => {
    const [topicTitle, setTopicTitle] = useState('');
    const [content, setContent] = useState('');
    const history = useHistory();

    useEffect(() => {
        document.title = `${title} | Create Topic`;
    }, [title]);

    useEffect(() => {
        if (match.params.topicid) {
            axios.get(`${endpoint}/talk/${match.params.articleid}/topics/${match.params.topicid}`, { withCredentials: true })
            .then(response => {
                setTopicTitle(response.data.topic.title);
                setContent(response.data.topic.content);
            })
            .catch(error => {
                console.error('Error fetching topic:', error);
            });
        }
    }, [match.params.articleid, match.params.topicid]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            withCredentials: true,
            headers: { 'csrf-token': csrfToken }
        }
        const topicEndpoint = `${endpoint}/talk/${match.params.articleid}/topics`;
        axios.post(topicEndpoint, { title: topicTitle, content: content }, config)
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
                <div className="topic-group">
                    <label htmlFor="topic-title">Topic Title:</label>
                    <input 
                        type="text" 
                        id="topic-title" 
                        value={topicTitle} 
                        onChange={(e) => setTopicTitle(e.target.value)}
                    />
                </div>
                <div className="topic-group">
                    <label htmlFor="initial-post">Initial Post:</label>
                    <ReactQuill
                        style={{ backgroundColor: 'white' }}
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                    />
                </div>
                <div className="topic-button-container">
                    {match.params.topicid ? 
                        <>
                            <button className="delete-topic-button" type="submit">Delete Topic</button>
                            <button className="new-topic-button" type="submit">Update Topic</button>
                        </> : 
                        <button className="new-topic-button" type="submit">Create Topic</button>
                    }
                </div>
            </form>
        </div>
    );
}

export default CreateTopicPage;