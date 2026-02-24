import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/common/Loader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader />
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate to="/auth/login" state={{ from: location }} replace />
};

export default PrivateRoute;
