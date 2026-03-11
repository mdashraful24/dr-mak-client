import { createBrowserRouter } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../components/common/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AboutDoctor from "../pages/AboutDoctor/AboutDoctor";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard/DoctorDashboard";
import Services from "../pages/Services/Services";
import Blogs from "../pages/Blogs/Blogs";
import Appointments from "../pages/Appointments/Appointments";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Settings from "../pages/Control/Settings";
import Reports from "../pages/Reports/Reports";
import PrivateRoute from "./Secure/PrivateRoute";
import AuthRouter from "./Secure/AuthRouter";
import ProfileSettings from "../pages/Control/components/ProfileSettings";
import PasswordSettings from "../pages/Control/components/PasswordSettings";
import EmailPreferences from "../pages/Control/components/EmailPreferences";
import NotificationSettings from "../pages/Control/components/NotificationSettings";
import PrivacySettings from "../pages/Control/components/PrivacySettings";
import DangerZone from "../pages/Control/components/DangerZone";
import Profile from "../pages/Profile/Profile";

export const router = createBrowserRouter([
    // Public Layout
    {
        path: "/",
        Component: PublicLayout,
        errorElement: <ErrorPage />,
        children: [
            { index: true, Component: Home },
            { path: "profile", Component: Profile },
            { path: "about-doctor", Component: AboutDoctor },
            { path: "services", Component: Services },
            { path: "reports", Component: Reports },
            { path: "blog", Component: Blogs },
            { path: "appointments", Component: Appointments },
            {
                path: "settings",
                element: (
                    <PrivateRoute>
                        <Settings />
                    </PrivateRoute>
                ),
                children: [
                    { path: "profile-setting", Component: ProfileSettings },
                    { path: "password-setting", Component: PasswordSettings },
                    { path: "email-preferences", Component: EmailPreferences },
                    { path: "notification-setting", Component: NotificationSettings },
                    { path: "privacy-setting", Component: PrivacySettings },
                    { path: "danger-zone", Component: DangerZone },
                ]
            },
        ],
    },

    // Dashboard Layout
    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <DoctorDashboard /> },
        ],
    },

    // Auth Layout
    {
        path: "auth",
        Component: AuthLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <AuthRouter />,
                children: [
                    { path: "login", Component: Login },
                    { path: "register", Component: Register },
                    { path: "forgot-password", Component: ForgotPassword }
                ]
            },
        ],
    },

    // Fallback 404
    {
        path: "*",
        element: <ErrorPage />,
    },
]);
