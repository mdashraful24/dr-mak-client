import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

const AuthRouter = () => {
    const { user, loading } = useAuth();

    if (user) {
        return <Navigate to={"/"} replace />;
    }
    return <Outlet />;
};

export default AuthRouter;
