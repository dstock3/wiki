import { useState, useEffect } from "react";
import axios from "axios";

const PortalsPage = ({ endpoint }) => {
    const [portals, setPortals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = `WikiWise | Portals`;
        axios.get(`${endpoint}/portals/`)
            .then(response => {
                setPortals(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="portals-page">Loading...</div>;
    if (error) return <div className="portals-page">Error: {error}</div>;

    return (
        <div className="portals-page">
            <h1>Portals</h1>
            <div className="portals-container">
                {portals && portals.map((portal) => (
                    <div className="portal-card" key={portal._id}>
                        <img src={portal.portalImage.src} alt={portal.portalImage.alt} />
                        <h2>{portal.portalTitle}</h2>
                        <p>{portal.portalDescription}</p>
                        <a href={`/${portal._id}`}>Visit Portal</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PortalsPage;