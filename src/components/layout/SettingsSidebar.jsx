import { NavLink } from 'react-router-dom';
import { ChevronRight, UserCircle, Key, BellRing, MailCheck, ShieldAlert, Trash2 } from 'lucide-react';

const menuItems = [
    {
        path: 'profile-setting',
        label: 'Profile Information',
        icon: <UserCircle size={20} />,
        description: 'Manage your personal information'
    },
    {
        path: 'email-preferences',
        label: 'Email Preferences',
        icon: <MailCheck size={20} />,
        description: 'Manage email notifications'
    },
    {
        path: 'password-setting',
        label: 'Update Password',
        icon: <Key size={20} />,
        description: 'Update password and security settings'
    },
    {
        path: 'notification-setting',
        label: 'Notifications',
        icon: <BellRing size={20} />,
        description: 'Configure notification preferences'
    },
    {
        path: 'privacy-setting',
        label: 'Privacy & Security',
        icon: <ShieldAlert size={20} />,
        description: 'Two-factor authentication and privacy'
    },
    {
        path: 'danger-zone',
        label: 'Danger Zone',
        icon: <Trash2 size={20} />,
        description: 'Delete account and export data'
    }
];

const SettingsSidebar = ({ userData, user }) => {
    return (
        <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* <div className="p-4 border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50">
                    <h2 className="text-xl font-semibold">Settings</h2>
                    <p className="text-sm">Manage your account</p>
                </div> */}
                <nav className="p-3 lg:p-4">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === 'profile-setting'}
                            className={({ isActive }) => `w-full flex items-start gap-3 p-2 lg:p-3 rounded-xl transition-all duration-300 mb-1
                            ${isActive
                                    ? item.path === 'danger-zone'
                                        ? 'bg-red-100 text-red-700 shadow-sm'
                                        : 'bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm'
                                    : 'hover:bg-gray-50'
                                }
    `}
                        >
                            {({ isActive }) => (
                                <>
                                    <div
                                        className={`p-2 rounded-lg transition-colors duration-300 settings-sidebar ${isActive
                                            ? item.path === 'danger-zone'
                                                ? 'bg-red-200 text-red-700 settings-danger-zone'
                                                : 'bg-blue-100 text-blue-600'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {item.icon}
                                    </div>

                                    <div className="flex-1 text-left">
                                        <div className={`${isActive ? 'font-semibold' : 'font-medium'}`}>
                                            {item.label}
                                        </div>
                                        <div className="text-xs text-gray-700 mt-0.5">
                                            {item.description}
                                        </div>
                                    </div>

                                    {isActive && (
                                        <ChevronRight
                                            size={20}
                                            className={item.path === 'danger-zone' ? 'text-red-600' : 'text-blue-600'}
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default SettingsSidebar;
