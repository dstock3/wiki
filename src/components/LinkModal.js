import React, { useState, useEffect } from 'react';

function LinkModal({ isOpen, onClose, onConfirm, articles }) {
  const [selectedArticleId, setSelectedArticleId] = useState('');

  useEffect(() => {
    if (articles && articles.length > 0) {
        setSelectedArticleId(articles[0]._id);
    }
  }, [articles]);

  const handleConfirm = () => {
      onConfirm(selectedArticleId);
  };

  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 10 }}>
        <p>Select an Article:</p>
        <select value={selectedArticleId} onChange={(e) => setSelectedArticleId(e.target.value)}>
          {Array.isArray(articles) && articles.map(article => (
              <option key={article.id} value={article._id}>
                  {article.title}
              </option>
          ))}
        </select>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default LinkModal;
