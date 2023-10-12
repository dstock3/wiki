import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function useArticleLinkEmbedder(endpoint, portalId, quill) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState('');
    const [articles, setArticles] = useState([]);
    const isMounted = useRef(true);

    useEffect(() => {
        if (isModalOpen) {
            console.log(`${endpoint}/portals/${portalId}/articles`)
            axios.get(`${endpoint}/portals/${portalId}/articles`)
                .then((res) => {
                    if(isMounted.current) {
                        setArticles(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

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

    useEffect(() => {
        console.log('Current Quill instance:', quill.current);
    }, []);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, []);

    const handleRightClick = (e) => {
        console.log('Right-click detected');
        e.preventDefault();
    
        const selection = quill && quill.current ? quill.current.getSelection() : null;
        if (selection && selection.length > 0) {
            const selectedText = quill.current.getText(selection.index, selection.length).trim();
            if (selectedText) {
                setSelectedWord(selectedText);
                setModalOpen(true);
            }
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