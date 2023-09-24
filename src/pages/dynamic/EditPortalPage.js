import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/EditPortalPage.css';

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
    if (!isEditMode) {
      setLoading(false);
    } else {
      axios.get(`${endpoint}/portals/${match.params.portalid}`)
        .then(response => {
          setPortalData(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err.message);
          setLoading(false);
        });
    }
  }, [title, isEditMode, match.params.portalid, endpoint]);

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
  
    const portalPayload = {
      portalTitle: portalData.portalTitle,
      portalDescription: portalData.portalDescription,
      portalImage: {
        src: portalData.portalImage.src,
        alt: portalData.portalImage.alt
      }
    };
  
    let formData = new FormData();
    formData.append('portalData', JSON.stringify(portalPayload));
    
    if (portalData.portalImageFile) {
      formData.append('image', portalData.portalImageFile);
    }
  
    try {
      let response;
      const requestOptions = {
        method: isEditMode ? 'PUT' : 'POST',
        body: formData,
        credentials: 'include'
      };
  
      if (isEditMode) {
        response = await fetch(`${endpoint}/portals/${match.params.portalid}`, requestOptions);
      } else {
        response = await fetch(`${endpoint}/portals`, requestOptions);
      }
  
      const responseData = await response.json();
      
  
      if (!response.ok) {
        throw new Error(responseData.error || 'An error occurred');
      }
  
      history.push(isEditMode ? `/${match.params.portalid}` : "/");
    } catch (error) {
      console.error("Error processing portal:", error.message);
    }
  };
  
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this portal? This action cannot be undone.');
    if (confirmDelete) {
        try {
            const response = await fetch(`${endpoint}/portals/${match.params.portalid}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                history.push("/");
            } else {
                const errorData = await response.json();
                alert(`Error deleting portal: ${errorData.error || 'Unknown error'}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
  };

  if (loading) return <div className="edit-portal-page">Loading...</div>;

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