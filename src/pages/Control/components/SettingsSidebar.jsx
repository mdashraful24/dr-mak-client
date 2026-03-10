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
                            className={({ isActive }) => `
                                w-full flex items-start gap-3 p-2 lg:p-3 rounded-xl transition-all duration-300 mb-1
                                ${isActive
                                    ? 'bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm'
                                    : 'hover:bg-gray-50'
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`p-2 rounded-lg ${isActive
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className={`${isActive
                                            ? 'font-semibold'
                                            : 'font-medium'
                                            }`}>
                                            {item.label}
                                        </div>
                                        <div className="text-xs text-gray-700 mt-0.5">
                                            {item.description}
                                        </div>
                                    </div>
                                    {isActive && (
                                        <ChevronRight size={20} className="text-blue-600" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-3 lg:p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
                <div className="space-y-1">
                    <NavLink
                        to="profile-setting"
                        className={({ isActive }) => `
                            w-full block text-left px-3 py-2 text-sm rounded-lg transition-colors
                            ${isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }
                        `}
                    >
                        Update Profile
                    </NavLink>
                    <NavLink
                        to="password-setting"
                        className={({ isActive }) => `
                            w-full block text-left px-3 py-2 text-sm rounded-lg transition-colors
                            ${isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }
                        `}
                    >
                        Change Password
                    </NavLink>
                    <NavLink
                        to="danger-zone"
                        className={({ isActive }) => `
                            w-full block text-left px-3 py-2 text-sm rounded-lg transition-colors
                            ${isActive
                                ? 'bg-red-50 text-red-600'
                                : 'text-red-600 hover:bg-red-50'
                            }
                        `}
                    >
                        Delete Account
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default SettingsSidebar;
