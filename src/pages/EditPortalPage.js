import React, { useState, useEffect } from 'react';
import '../styles/EditPortalPage.css';

const EditPortalPage = ({ match, history }) => {
  const [portalData, setPortalData] = useState({
    portalTitle: '',
    portalDescription: '',
    portalImage: ''
  });
  const [loading, setLoading] = useState(true);
  const isEditMode = !!match.params.portalid;

  useEffect(() => {
    if (isEditMode) {
      // get current portal data based on match.params.portalid
      const fetchedPortalData = {
        portalTitle: "Nature & Wildlife",
        portalDescription: "All about nature and wildlife...",
        portalImage: "https://via.placeholder.com/250"
      };
      setPortalData(fetchedPortalData);
    }
    setLoading(false);
  }, [match.params.portalid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortalData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // update portal in backend
    } else {
      // create new portal in backend
    }
    history.push(isEditMode ? `/${match.params.portalid}` : "/");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this portal? This action cannot be undone.');
    if (confirmDelete) {
      // API call to delete portal based on match.params.portalid
      // redirect to homepage
      history.push("/");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit-portal-page">
      <h1>{isEditMode ? "Edit Portal" : "Create Portal"}</h1>
      <form onSubmit={handleSubmit}>
        {isEditMode && (
          <button type="button" onClick={handleDelete} className="delete-button">
            Delete Portal
          </button>
        )}
        <div className="form-group">
          <label>Title:</label>
          <input 
            type="text" 
            name="portalTitle" 
            value={portalData.portalTitle} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea 
            name="portalDescription" 
            value={portalData.portalDescription} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input 
            type="url" 
            name="portalImage" 
            value={portalData.portalImage} 
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save</button>
        <button type="button" onClick={() => history.goBack()}>Cancel</button>
      </form>
    </div>
  );
};

export default EditPortalPage;