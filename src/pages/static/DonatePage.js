import { useEffect } from 'react';
import SideMenu from '../../components/SideMenu';
import '../../styles/DonatePage.css';

const DonatePage = ({title}) => {
    useEffect(() => {
        document.title = `${title} | Donate`;
    }, [title]);

    return (
        <div className="donate-page">
            <SideMenu />
            <div className="donate-container">
                <h1>Donate to {title}</h1>
                
                <p>Thank you for your interest in supporting {title}! At this time, we are not accepting donations.</p>

                <p>Please check back in the future, and in the meantime, consider contributing content or joining our community discussions.</p>
                
                <p>We appreciate your understanding and support!</p>
            </div>
        </div>
    );
}

export default DonatePage;