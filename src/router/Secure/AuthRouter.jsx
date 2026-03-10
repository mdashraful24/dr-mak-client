import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router";

const AuthRouter = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    if (user) {
        return <Navigate to={from} replace />;
    }
    return <Outlet />;
};

export default AuthRouter;
