import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import useAuth from '../../hooks/useAuth';
import { useSettingsData } from '../../hooks/setting/useSettingsData';
import SettingsSidebar from "../../components/layout/SettingsSidebar";
import DeleteAccountModal from "./components/DeleteAccountModal";
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const Settings = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {
        userData,
        isLoadingUser,
        emailNotifications,
        updateProfileMutation,
        changePasswordMutation,
        updateNotificationsMutation,
        deleteAccountMutation,
        handleNotificationToggle
    } = useSettingsData();

    // Redirect to profile-setting if at root settings path
    useEffect(() => {
        if (location.pathname === '/settings' || location.pathname === '/settings/') {
            navigate('profile-setting', { replace: true });
        }
    }, [location.pathname, navigate]);

    return (
        <div className="container max-w-7xl mx-auto min-h-screen px-4 pt-24 pb-20">
            <div className="flex flex-col md:flex-row gap-5 lg:gap-8">
                {/* Sidebar */}
                <div className="md:w-72 lg:w-80 shrink-0">
                    <SettingsSidebar
                        userData={userData}
                        user={user}
                    />
                </div>

                {/* Main Content - Renders child routes */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6">
                        <Outlet context={{
                            userData,
                            emailNotifications,
                            updateProfileMutation,
                            changePasswordMutation,
                            updateNotificationsMutation,
                            deleteAccountMutation,
                            handleNotificationToggle,
                            setShowDeleteModal
                        }} />
                    </div>
                </div>
            </div>

            {/* Delete Account Modal */}
            <DeleteAccountModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                deleteAccountMutation={deleteAccountMutation}
            />
        </div>
    );
};

export default Settings;
