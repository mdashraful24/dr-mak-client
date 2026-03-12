import useAdmin from "../../hooks/admin/useAdmin";
import usePatient from "../../hooks/patient/usePatient";
import useAuth from "../../hooks/useAuth";
import UserProfile from "./components/UserProfile";

const Profile = () => {
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isPatient, isPatientLoading] = usePatient();

    // Show nothing while any loading is happening
    if (authLoading || isAdminLoading || isPatientLoading) {
        return null;
    }

    // If user is not authenticated (shouldn't happen if route is protected)
    if (!user) {
        return (
            <div className="md:h-[calc(70vh-4rem)] flex items-center justify-center py-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] p-12 text-center">
                        <p className="text-lg text-red-500">
                            Please log in to view your profile.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Check if user has any valid role
    const hasValidRole = isAdmin || isPatient;

    return (
        <div className="min-h-screen py-24 px-4">
            {hasValidRole ? (
                <UserProfile />
            ) : (
                <div className="max-w-4xl mx-auto md:h-[calc(70vh-4rem)] flex items-center justify-center">
                    <div className="rounded-2xl shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] p-10 text-center">
                        <p className="text-lg mb-3">
                            Searching for information to view your profile.
                        </p>
                        <p className="text-sm text-gray-600 mb-8">
                            If this persists, please contact support.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
