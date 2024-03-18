import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../styles/EditPortalPage.css';
import Loading from '../../components/Loading';
import ReactQuill from 'react-quill';
import { modules, formats } from '../../config/quillConfig';
import useArticles from '../../hooks/useArticles';

const EditPortalPage = ({ match, history, endpoint, title, csrfToken }) => {
  const [portalData, setPortalData] = useState({
    portalTitle: '',
    portalDescription: '',
    portalImage: '',
    portalImageFile: null
  });
  
  const [loading, setLoading] = useState(true);
  const isEditMode = !!match.params.portalid;
  const { articles, er } = useArticles(match.params.portalid, endpoint);
  const quillRef = useRef(null);
  const [error, setError] = useState(null);

  const extendedModules = {
    ...modules,
    ...(articles.length > 0 && {
        articleDropdown: {
            articles: articles,
            portalId: match.params.portalid
        }
    })
  };

  useEffect(() => {
    document.title = `${title} | ${isEditMode ? "Edit Portal" : "Create Portal"}`;
    if (!isEditMode) {
      setLoading(false);
    } else {
      axios.get(`${endpoint}/portals/${match.params.portalid}`, { withCredentials: true })
        .then(response => {
          setPortalData(response.data.portal);
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
          portalImage: { src: reader.result, alt: "" },
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
    formData.append('_csrf', csrfToken);
    if (portalData.portalImageFile) {
        formData.append('image', portalData.portalImageFile);
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        };
        
        const response = isEditMode ? 
            await axios.put(`${endpoint}/portals/${match.params.portalid}`, formData, config) :
            await axios.post(`${endpoint}/portals`, formData, config);

        history.push(isEditMode ? `/wiki/${match.params.portalid}` : `/wiki/${response.data._id}`);
    } catch (error) {
        console.error("Error processing portal:", error.message);
        console.log(error);
        setError(error.message);
    }
  };
  
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this portal? This action cannot be undone.');
    if (confirmDelete) {
        try {
            await axios.delete(`${endpoint}/portals/${match.params.portalid}?_csrf=${encodeURIComponent(csrfToken)}`, {
                withCredentials: true
            });
            history.push("/wiki");
        } catch (error) {
            console.error("Error deleting portal:", error.message);
            alert(`Error: ${error.message}`);
        }
      }
  };

  if (loading) return <div className="edit-portal-page">
    <Loading loading={loading} />
  </div>;

  return (
    <div className="edit-portal-page">
      <div className="edit-portal-container">
        <h1 className="edit-portal-header">
          {isEditMode ? "Edit Portal" : "Create Portal"}
        </h1>
        {error && <div className="error-message">{error}</div>}
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
                  <img src={portalData.portalImage.src} className="img-preview" alt="Uploaded Preview" width="100" />
              )}
            </div>
          </div>

          <div className="portal-form-group">
            <label className="portal-main-label">Description:</label>
            <ReactQuill
              ref={quillRef}
              value={portalData.portalDescription}
              onChange={(content) => setPortalData(prev => ({ ...prev, portalDescription: content }))}
              modules={extendedModules}
              formats={formats}
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