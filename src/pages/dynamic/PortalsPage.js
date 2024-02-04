import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/PortalsPage.css";
import { Link } from 'react-router-dom';
import Loading from "../../components/Loading";
import { parseContentToComponents, abridgeReactContent } from '../../utils/textParsers';

const PortalsPage = ({ endpoint, title }) => {
    const [portals, setPortals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        document.title = `${title} | Portals`;
        axios.get(`${endpoint}/portals/`, { withCredentials: true })
            .then(response => {
                setPortals(response.data.portals);
                setLoading(false);
                setIsAuthenticated(response.data.isLoggedIn);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [title, endpoint]);

    if (loading) return <div className="portals-page">
        <Loading loading={loading} />
    </div>;
    if (error) return <div className="portals-page">Error: {error}</div>;

    return (
        <div className="portals-page">
            <h1>Portals</h1>
            <div className="create-portal-link-container">
                {isAuthenticated && <Link className="create-portal-link" to="/create-portal">Create Portal</Link>}
            </div>
            <div className="portals-desc">
                <h2>What are portals?</h2>
                <p>Portals are created by users like you. They are a way to share your favorite resources with the world. You can create a portal by clicking the "Create Portal" link. You can also edit or delete your portals by clicking the edit button on the portal page.</p>
            </div>
            
            <div className="portals-container">
                {portals && portals.map((portal) => (
                    <div className="portal-card" key={portal._id}>
                        <div className="portal-card-img-container">
                            <img src={portal.portalImage.src} alt={portal.portalImage.alt} />
                        </div>
                        <div className="portal-card-bottom">
                            <div className="portal-card-bottom-subcontainer">
                                <h2 className="portal-card-head">{portal.portalTitle}</h2>
                                <div>{abridgeReactContent(parseContentToComponents(portal.portalDescription), 200)}</div>
                            </div>

                            <Link className="portal-card-bottom-link" to={`/${portal._id}`}>Visit Portal</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PortalsPage;