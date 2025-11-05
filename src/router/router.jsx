import { createBrowserRouter } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../components/common/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard/DoctorDashboard";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

export const router = createBrowserRouter([
    // Public Layout
    {
        path: "/",
        Component: PublicLayout,
        errorElement: <ErrorPage />,
        children: [
            { index: true, Component: Home },
        ],
    },

    // Dashboard Layout
    {
        path: "dashboard",
        Component: DashboardLayout,
        errorElement: <ErrorPage />,
        children: [
            { index: true, Component: DoctorDashboard },
        ],
    },

    // Auth Layout
    {
        path: "auth",
        Component: AuthLayout,
        errorElement: <ErrorPage />,
        children: [
            { path: "login", Component: Login },
            { path: "register", Component: Register },
        ],
    },

    // Fallback 404
    {
        path: "*",
        element: <ErrorPage />,
    },
]);
