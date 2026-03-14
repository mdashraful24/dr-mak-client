import { createBrowserRouter } from "react-router";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home/Home";
import AboutDoctor from "../pages/AboutDoctor/AboutDoctor";
import Services from "../pages/Services/Services";
import Blogs from "../pages/Blogs/Blogs";

import MyProfile from "../pages/MyProfile/MyProfile";
import Appointments from "../pages/Appointments/Appointments";
import Reports from "../pages/Reports/Reports";

import DoctorDashboard from "../pages/Dashboard/DoctorDashboard/DoctorDashboard";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import Settings from "../pages/Control/Settings";
import ProfileSettings from "../pages/Control/components/ProfileSettings";
import PasswordSettings from "../pages/Control/components/PasswordSettings";
import EmailPreferences from "../pages/Control/components/EmailPreferences";
import NotificationSettings from "../pages/Control/components/NotificationSettings";
import PrivacySettings from "../pages/Control/components/PrivacySettings";
import DangerZone from "../pages/Control/components/DangerZone";

import ErrorPage from "../components/common/ErrorPage";

import PrivateRoute from "./Secure/PrivateRoute";
import AuthRouter from "./Secure/AuthRouter";

export const router = createBrowserRouter([

    // PUBLIC ROUTES
    {
        path: "/",
        element: <PublicLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },

            { path: "about-doctor", element: <AboutDoctor /> },
            { path: "services", element: <Services /> },
            { path: "blog", element: <Blogs /> },

            {
                path: "profile",
                element: (
                    <PrivateRoute>
                        <MyProfile />
                    </PrivateRoute>
                ),
            },

            {
                path: "appointments",
                element: (
                    <PrivateRoute>
                        <Appointments />
                    </PrivateRoute>
                ),
            },

            {
                path: "reports",
                element: (
                    <PrivateRoute>
                        <Reports />
                    </PrivateRoute>
                ),
            },

            {
                path: "settings",
                element: (
                    <PrivateRoute>
                        <Settings />
                    </PrivateRoute>
                ),
                children: [
                    { path: "profile-setting", element: <ProfileSettings /> },
                    { path: "password-setting", element: <PasswordSettings /> },
                    { path: "email-preferences", element: <EmailPreferences /> },
                    { path: "notification-setting", element: <NotificationSettings /> },
                    { path: "privacy-setting", element: <PrivacySettings /> },
                    { path: "danger-zone", element: <DangerZone /> },
                ],
            },
        ],
    },

    // DASHBOARD ROUTES
    {
        path: "/dashboard",
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

    // AUTH ROUTES
    {
        path: "/auth",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <AuthRouter />,
                children: [
                    { path: "login", element: <Login /> },
                    { path: "register", element: <Register /> },
                    { path: "forgot-password", element: <ForgotPassword /> },
                ],
            },
        ],
    },

    // 404 ROUTE
    {
        path: "*",
        element: <ErrorPage />,
    },
]);
