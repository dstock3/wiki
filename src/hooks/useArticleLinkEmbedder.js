import { useState, useEffect } from 'react';
import axios from 'axios';

function useArticleLinkEmbedder(endpoint, portalId) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState('');
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        console.log(portalId)
        if (isModalOpen) {
            axios.get(`${endpoint}/portals/${portalId}/articles`)
                .then((res) => {
                    setArticles(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (isModalOpen) {
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    setModalOpen(false);
                    setSelectedWord('');
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isModalOpen]);

    const handleRightClick = (e) => {
        e.preventDefault();
        const selection = window.getSelection().toString().trim();
        if (selection) {
            setSelectedWord(selection);
            setModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedWord('');
    };

    const handleModalConfirm = (articleID) => {
        const linkSyntax = `[[PortalID: ${portalId} | ArticleID:${articleID}|${selectedWord}]]`;
        handleModalClose();
        return {linkSyntax, selectedWord};
    };

    return {
        isModalOpen,
        articles,
        handleRightClick,
        handleModalClose,
        handleModalConfirm
    };
}

export default useArticleLinkEmbedder;