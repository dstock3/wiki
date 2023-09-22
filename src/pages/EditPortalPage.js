import React, { useState, useEffect } from 'react';
import '../styles/EditPortalPage.css';

const EditPortalPage = ({ match, history, endpoint, title }) => {
  const [portalData, setPortalData] = useState({
    portalTitle: '',
    portalDescription: '',
    portalImage: '',
    portalImageFile: null
  });
  
  const [loading, setLoading] = useState(true);
  const isEditMode = !!match.params.portalid;

  useEffect(() => {
    document.title = `${title} | ${isEditMode ? "Edit Portal" : "Create Portal"}`;
  }, [title, isEditMode]);

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

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPortalData(prevData => ({
                ...prevData,
                portalImage: reader.result,
                portalImageFile: file
            }));
        }
        reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortalData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('portalTitle', portalData.portalTitle);
    formData.append('portalDescription', portalData.portalDescription);
    formData.append('image', portalData.portalImageFile);

    try {
        if (isEditMode) {
            // update portal in backend
            // Depending on your API, you might use a PUT or PATCH request here
            await fetch(`/api/portals/${match.params.portalid}`, {
                method: 'PUT',
                body: formData
            });
        } else {
            // create new portal in backend
            await fetch('/api/portals', {
                method: 'POST',
                body: formData
            });
        }
        history.push(isEditMode ? `/${match.params.portalid}` : "/");
    } catch (error) {
        console.error("Error uploading image:", error);
    }
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
      <div className="edit-portal-container">
        <h1 className="edit-portal-header">
          {isEditMode ? "Edit Portal" : "Create Portal"}
        </h1>
        <form className="portal-form" onSubmit={handleSubmit}>
          <div className="portal-form-group-container">
            <div className="portal-form-group title-group">
              <label className="portal-main-label">Title:</label>
              <input 
                type="text" 
                name="portalTitle" 
                value={portalData.portalTitle} 
                onChange={handleChange}
                required
              />
            </div>

            <div className="portal-form-group img-form-group">
              <div className="img-upload-container">
                <label className="portal-main-label">Upload Image:</label>
                <input 
                    type="file" 
                    name="portalImageFile" 
                    onChange={handleImageUpload}
                />
              </div>
              {portalData.portalImage && (
                  <img src={portalData.portalImage} className="img-preview" alt="Uploaded Preview" width="100" />
              )}
            </div>
          </div>

          <div className="portal-form-group">
            <label className="portal-main-label">Description:</label>
            <textarea 
              name="portalDescription" 
              value={portalData.portalDescription} 
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-container">
            <div className="submit-container">
              <button type="submit" className="edit-portal-button">Save</button>
              <button type="button" onClick={() => history.goBack()} className="edit-portal-button">Cancel</button>
            </div>
            {isEditMode && (
              <button type="button" onClick={handleDelete} className="delete-button">
                Delete Portal
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPortalPage;