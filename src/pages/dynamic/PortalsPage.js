import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/PortalsPage.css";

const PortalsPage = ({ endpoint, title }) => {
    const [portals, setPortals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = `${title} | Portals`;
        axios.get(`${endpoint}/portals/`)
            .then(response => {
                setPortals(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [title, endpoint]);

    if (loading) return <div className="portals-page">Loading...</div>;
    if (error) return <div className="portals-page">Error: {error}</div>;

    return (
        <div className="portals-page">
            <h1>Portals</h1>
            <div className="portals-container">
                {portals && portals.map((portal) => (
                    <div className="portal-card" key={portal._id}>
                        <div className="portal-card-img-container">
                            <img src={portal.portalImage.src} alt={portal.portalImage.alt} />
                        </div>
                        <div className="portal-card-bottom">
                            <h2 className="portal-card-head">{portal.portalTitle}</h2>
                            <p className="portal-desc">{portal.portalDescription}</p>
                            <a className="portal-link" href={`/${portal._id}`}>Visit Portal</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PortalsPage;