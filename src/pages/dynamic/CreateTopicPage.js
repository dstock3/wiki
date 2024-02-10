import React, { useState, useEffect, useRef } from 'react';
import '../../styles/CreateTopicPage.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import useArticles from '../../hooks/useArticles';
import { modules, formats } from '../../config/quillConfig';

const CreateTopicPage = ({ match, title, endpoint, csrfToken }) => {
    const [topicTitle, setTopicTitle] = useState('');
    const [content, setContent] = useState('');
    const { articles, er } = useArticles(match.params.portalid, endpoint);
    const quillRef = useRef(null);
    const history = useHistory();
    
    const extendedModules = {
        ...modules,
        articleDropdown: {
            articles: articles,
            portalId: match.params.portalid
        }
    };
    
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
        if (match.params.topicid) { return handleUpdate(e); }
        return handleCreate(e);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const config = {
            withCredentials: true,
            headers: { 'csrf-token': csrfToken }
        }
        const topicEndpoint = `${endpoint}/talk/${match.params.articleid}/topics`;
        axios.post(topicEndpoint, { title: topicTitle, content: content }, config)
        .then(response => {
            history.push(`/wiki/${match.params.portalid}/article/${match.params.articleid}/talk`);
            console.log('Topic created successfully:', response.data);
        })
        .catch(error => {
            console.error('Error creating topic:', error);
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const config = {
            withCredentials: true,
            headers: { 'csrf-token': csrfToken }
        }
        const updateEndpoint = `${endpoint}/talk/${match.params.articleid}/topics/${match.params.topicid}`;
        axios.put(updateEndpoint, { title: topicTitle, content: content }, config)
        .then(response => {
            history.push(`/wiki/${match.params.portalid}/article/${match.params.articleid}/talk`);
            console.log('Topic updated successfully:', response.data);
        })
        .catch(error => {
            console.error('Error updating topic:', error);
        });
    };

    const handleDelete = () => {
        const config = {
            withCredentials: true,
            headers: { 'csrf-token': csrfToken }
        };
        const deleteEndpoint = `${endpoint}/talk/${match.params.articleid}/topics/${match.params.topicid}`;
        axios.delete(deleteEndpoint, config)
        .then(response => {
            console.log('Topic deleted successfully:', response.data);
            history.push(`/wiki/${match.params.portalid}/article/${match.params.articleid}/talk`);
        })
        .catch(error => {
            console.error('Error deleting topic:', error);
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
                        ref={quillRef}
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                    />
                </div>
                <div className="topic-button-container">
                    {match.params.topicid ? 
                        <>
                            <button type="button" className="delete-topic-button" onClick={handleDelete}>Delete Topic</button>
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