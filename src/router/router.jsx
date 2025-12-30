import { createBrowserRouter } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../components/common/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AboutDoctor from "../components/home/AboutDoctor";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard/DoctorDashboard";
import Services from "../pages/Services/Services";
import Blogs from "../pages/Blogs/Blogs";
import Appointments from "../pages/Appointments/Appointments";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Settings from "../pages/Control/Settings";
import Reports from "../pages/Reports/Reports";

export const router = createBrowserRouter([
    // Public Layout
    {
        path: "/",
        Component: PublicLayout,
        errorElement: <ErrorPage />,
        children: [
            { index: true, Component: Home },
            { path: "about", Component: AboutDoctor },
            { path: "services", Component: Services },
            { path: "reports", Component: Reports },
            { path: "blog", Component: Blogs },
            { path: "appointments", Component: Appointments },
            { path: "settings", Component: Settings },
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
            { path: "forgot-password", Component: ForgotPassword }
        ],
    },

    // Fallback 404
    {
        path: "*",
        element: <ErrorPage />,
    },
]);
