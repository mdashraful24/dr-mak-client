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
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import PatientDashboard from "../pages/Dashboard/PatientDashboard/PatientDashboard";
import Patients from "../pages/Dashboard/Patients/Patients";
import Prescriptions from "../pages/Dashboard/Prescriptions/Prescriptions";
import MedicalRecords from "../pages/Dashboard/MedicalRecords/MedicalRecords";
import Doctors from "../pages/Dashboard/Doctors/Doctors";
import Departments from "../pages/Dashboard/Departments/Departments";
import Schedule from "../pages/Dashboard/Schedule/Schedule";

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
            { path: "doctor", Component: DoctorDashboard },
            { path: "admin", Component: AdminDashboard },
            { path: "patient", Component: PatientDashboard },
            { path: "patients", Component: Patients },
            { path: "prescriptions", Component: Prescriptions },
            { path: "medical-records", Component: MedicalRecords },
            { path: "reports", Component: Reports },
            { path: "doctors", Component: Doctors },
            { path: "departments", Component: Departments },
            { path: "schedule", Component: Schedule },
            { path: "settings", Component: Settings },
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
