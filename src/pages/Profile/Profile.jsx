import useAuth from "../../hooks/useAuth";
import UserProfile from "./components/UserProfile";

const Profile = () => {
    const { user, loading } = useAuth();

    // Return nothing while loading
    if (loading) {
        return null;
    }

    return (
        <div className="min-h-screen py-24 px-4">
            {user ? (
                <UserProfile />
            ) : (
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] p-12 text-center">
                        <p className="text-red-600 text-lg">
                            Please log in to view your profile.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
