
import { Navigate  } from "react-router-dom";  
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Spinner from "../pages/shared/LoadingSpinner/Spiner";

const ProtectDashboard = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin(); 

    if (user && isAdmin) return children;
    if (loading || isAdminLoading) return (
        <div className="flex justify-center items-center h-screen">
            <Spinner size="lg" />
        </div>
    );

    return <Navigate to="/login" />;
};

export default ProtectDashboard;