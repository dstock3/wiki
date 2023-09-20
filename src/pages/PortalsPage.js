import { useState, useEffect } from "react";
import axios from "axios";

const PortalsPage = ({endpoint}) => {
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
        console.log(portals)
    }, []);

    return(
        <div className="portals-page">
            <h1>Portals</h1>
            <div className="portals-container">
                {portals && portals.map((portal) => (
                    <div className="portal-card" key={portal.id}>
                        <h2>{portal.title}</h2>
                        <p>{portal.description}</p>
                        <a href={portal.link}>Visit Portal</a>
                    </div>
                ))}
            </div>
        </div>        
    )
}

export default PortalsPage;