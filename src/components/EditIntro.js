import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { modules, formats } from '../config/quillConfig';

const EditIntro = ({articles, match, articleIntro, setArticle}) => {
    const quillRef = useRef(null);

    const extendedModules = {
        ...modules,
        articleDropdown: {
            articles: articles,
            portalId: match.params.portalid
        }
    };

    return (
        <ReactQuill
            style={{ backgroundColor: 'white' }}
            ref={quillRef}
            value={articleIntro}
            modules={extendedModules}
            formats={formats}
            onChange={(content, delta, source, editor) => {
                setArticle(prev => ({ ...prev, intro: editor.getHTML() }));
            }}
        />
    )
}

export default EditIntro
