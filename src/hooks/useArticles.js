import { useState, useEffect } from 'react';
import axios from 'axios';

const useArticles = (portalId, endpoint) => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${endpoint}/portals/${portalId}/articles`, { withCredentials: true })
        .then(response => {
            setArticles(response.data);
        })
        .catch(err => {
            setError("Error fetching articles: " + err.message);
        });
    }, [portalId, endpoint]);

    return { articles, error };
};

export default useArticles;