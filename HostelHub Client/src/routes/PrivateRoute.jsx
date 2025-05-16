import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../pages/shared/LoadingSpinner/Spiner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(loading)

    if (loading) {
        return <Spinner />
    }

    return user ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location.pathname }} replace />
    );
};

export default PrivateRoute;