import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ScrollToTopLink = ({ to, children, ...props }) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Link to={to} {...props}>
            {children}
        </Link>
    );
};


export { ScrollToTopLink };