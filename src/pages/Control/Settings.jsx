import { useState } from 'react';
import {
    Sun,
    Moon,
    Volume2,
    Bell,
    Globe,
    User,
    Save,
    Palette,
    Eye,
    EyeOff,
    Shield,
    Monitor,
    Home,
    LogOut,
    Download,
    Trash2,
    AlertCircle,
    CheckCircle,
    Mail,
    ShieldCheck,
    X,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
    const [darkMode, setDarkMode] = useState('system');
    const [volume, setVolume] = useState(70);
    const [notifications, setNotifications] = useState(true);
    const [autoSave, setAutoSave] = useState(true);
    const [language, setLanguage] = useState('en');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState({
        newsletter: true,
        updates: false,
        promotions: false,
        reminders: true
    });

    const settingsSections = [
        {
            title: 'Appearance',
            icon: <Palette className="w-5 h-5 text-blue-600" />,
            settings: [
                {
                    id: 'theme',
                    label: 'Theme',
                    type: 'theme-select',
                    value: darkMode,
                    onChange: setDarkMode,
                    icon: <Sun className="w-4 h-4 text-yellow-500" />
                }
            ]
        },
        {
            title: 'Notifications',
            icon: <Bell className="w-5 h-5 text-purple-600" />,
            settings: [
                {
                    id: 'volume',
                    label: 'Sound Volume',
                    type: 'slider',
                    value: volume,
                    onChange: setVolume,
                    icon: <Volume2 className="w-4 h-4 text-blue-500" />
                },
                {
                    id: 'notifications',
                    label: 'Push Notifications',
                    type: 'toggle',
                    value: notifications,
                    onChange: setNotifications,
                    icon: <Bell className="w-4 h-4 text-purple-500" />
                }
            ]
        },
        {
            title: 'Privacy & Security',
            icon: <Shield className="w-5 h-5 text-green-600" />,
            settings: [
                {
                    id: 'password',
                    label: 'Change Password',
                    type: 'password',
                    value: password,
                    onChange: setPassword,
                    showPassword,
                    setShowPassword
                },
                {
                    id: 'twoFactor',
                    label: 'Two-Factor Authentication',
                    type: 'toggle',
                    value: false,
                    onChange: () => { },
                    icon: <ShieldCheck className="w-4 h-4 text-green-500" />
                }
            ]
        },
        {
            title: 'General',
            icon: <Globe className="w-5 h-5 text-cyan-600" />,
            settings: [
                {
                    id: 'language',
                    label: 'Language',
                    type: 'select',
                    value: language,
                    onChange: setLanguage,
                    options: [
                        { value: 'en', label: 'English' },
                        { value: 'es', label: 'Spanish' },
                        { value: 'fr', label: 'French' },
                        { value: 'de', label: 'German' }
                    ]
                },
                {
                    id: 'autoSave',
                    label: 'Auto Save',
                    type: 'toggle',
                    value: autoSave,
                    onChange: setAutoSave,
                    icon: <Save className="w-4 h-4 text-blue-500" />
                }
            ]
        },
        {
            title: 'Account',
            icon: <User className="w-5 h-5 text-indigo-600" />,
            settings: [
                {
                    id: 'emailNotifications',
                    label: 'Email Preferences',
                    type: 'link',
                    onClick: () => console.log('Email preferences'),
                    icon: <Mail className="w-4 h-4 text-indigo-500" />
                },
                {
                    id: 'exportData',
                    label: 'Export Data',
                    type: 'link',
                    onClick: () => console.log('Export data'),
                    icon: <Download className="w-4 h-4 text-green-500" />
                }
            ]
        }
    ];

    const themeOptions = [
        { id: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
        { id: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
        { id: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> }
    ];

    const SettingInput = ({ setting }) => {
        switch (setting.type) {
            case 'toggle':
                return (
                    <button
                        onClick={() => setting.onChange(!setting.value)}
                        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${setting.value
                            ? 'bg-linear-to-r from-blue-500 to-blue-600'
                            : 'bg-linear-to-br from-gray-200 to-gray-300'
                            } shadow-neumorphic-inset active:shadow-neumorphic-pressed`}
                    >
                        <div
                            className={`absolute top-1 w-6 h-6 rounded-full bg-white transform transition-transform duration-300 shadow-lg ${setting.value ? 'left-7' : 'left-1'
                                }`}
                        />
                    </button>
                );

            case 'slider':
                return (
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-600 w-10">
                            {setting.value}%
                        </span>
                        <div className="relative flex-1">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={setting.value}
                                onChange={(e) => setting.onChange(parseInt(e.target.value))}
                                className="w-full h-2 bg-linear-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer shadow-neumorphic-inset"
                            />
                            <div
                                className="absolute top-0 left-0 h-2 bg-linear-to-r from-blue-500 to-blue-600 rounded-full pointer-events-none"
                                style={{ width: `${setting.value}%` }}
                            />
                            <div
                                className="absolute top-1/2 w-6 h-6 rounded-full bg-white border-2 border-blue-500 transform -translate-y-1/2 shadow-lg pointer-events-none"
                                style={{ left: `${setting.value}%` }}
                            />
                        </div>
                    </div>
                );

            case 'select':
                return (
                    <div className="relative">
                        <select
                            value={setting.value}
                            onChange={(e) => setting.onChange(e.target.value)}
                            className="w-48 pl-4 pr-10 py-2.5 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                       border border-gray-300 text-gray-800 font-medium
                       shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                       focus:border-blue-400 transition-all duration-200 appearance-none"
                        >
                            {setting.options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-500 w-4 h-4" />
                    </div>
                );

            case 'password':
                return (
                    <div className="relative">
                        <input
                            type={setting.showPassword ? "text" : "password"}
                            value={setting.value}
                            onChange={(e) => setting.onChange(e.target.value)}
                            placeholder="Enter new password"
                            className="w-64 pl-4 pr-12 py-2.5 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                       border border-gray-300 text-gray-800 font-medium placeholder-gray-600
                       shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                       focus:border-blue-400 transition-all duration-200"
                        />
                        <button
                            onClick={() => setting.setShowPassword(!setting.showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            {setting.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                );

            case 'theme-select':
                return (
                    <div className="flex space-x-3">
                        {themeOptions.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => setting.onChange(theme.id)}
                                className={`p-3 rounded-xl transition-all duration-200 ${setting.value === theme.id
                                    ? 'bg-linear-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-neumorphic-pressed'
                                    : 'bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-neumorphic-soft hover:shadow-soft'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg mb-2 ${setting.value === theme.id
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {theme.icon}
                                </div>
                                <span className={`text-sm font-medium ${setting.value === theme.id ? 'text-blue-700' : 'text-gray-600'
                                    }`}>
                                    {theme.label}
                                </span>
                            </button>
                        ))}
                    </div>
                );

            case 'link':
                return (
                    <button
                        onClick={setting.onClick}
                        className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                    >
                        <span>Configure</span>
                        <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group mb-4"
                            >
                                <Home size={18} className="group-hover:-translate-x-1 transition-transform" />
                                <span>Return to Home</span>
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-linear-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                                Settings
                            </h1>
                            <p className="text-gray-600">
                                Customize your application experience
                            </p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                            border border-gray-200 shadow-neumorphic-soft hover:shadow-soft 
                            active:shadow-neumorphic-pressed transition-all duration-200 text-gray-700 font-medium">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {settingsSections.map((section, sectionIndex) => (
                        <div
                            key={sectionIndex}
                            className="bg-white rounded-3xl p-6 shadow-soft border border-gray-200 transition-all duration-300 hover:shadow-xl"
                        >
                            {/* Section Header */}
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 rounded-xl shadow-neumorphic-soft flex items-center justify-center">
                                    {section.icon}
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {section.title}
                                </h2>
                            </div>

                            {/* Settings Items */}
                            <div className="space-y-6">
                                {section.settings.map((setting, settingIndex) => (
                                    <div
                                        key={settingIndex}
                                        className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                                    >
                                        <div className="flex items-center space-x-3">
                                            {setting.icon && (
                                                <div className="text-gray-500">
                                                    {setting.icon}
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-medium text-gray-700">
                                                    {setting.label}
                                                </h3>
                                            </div>
                                        </div>
                                        <SettingInput setting={setting} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Profile Section */}
                <div className="mt-8 bg-white rounded-3xl p-6 shadow-soft border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <User className="w-5 h-5 mr-3 text-indigo-600" />
                        Profile Settings
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full px-4 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                         border border-gray-300 text-gray-800 font-medium placeholder-gray-600
                         shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                         focus:border-blue-400 transition-all duration-200"
                                defaultValue="JohnDoe"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                         border border-gray-300 text-gray-800 font-medium placeholder-gray-600
                         shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                         focus:border-blue-400 transition-all duration-200"
                                defaultValue="john@example.com"
                            />
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Theme Color"
                                className="w-full px-4 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                         border border-gray-300 text-gray-800 font-medium placeholder-gray-600
                         shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                         focus:border-blue-400 transition-all duration-200"
                                defaultValue="#3B82F6"
                            />
                            <button className="w-full px-4 py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 
                               text-white font-semibold shadow-md hover:shadow-lg 
                               active:shadow-neumorphic-pressed transition-all duration-200">
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="mt-8 bg-white rounded-3xl p-6 shadow-soft border border-red-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-red-700">Danger Zone</h2>
                            <p className="text-red-600 text-sm">Irreversible actions</p>
                        </div>
                        <AlertCircle className="w-6 h-6 text-red-500" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="px-4 py-3 rounded-xl bg-linear-to-br from-red-50 to-red-100 
                       border border-red-200 text-red-700 font-semibold
                       shadow-neumorphic-soft hover:shadow-soft 
                       active:shadow-neumorphic-pressed transition-all duration-200 
                       flex items-center justify-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                        </button>

                        <button
                            className="px-4 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                       border border-gray-200 text-gray-700 font-semibold
                       shadow-neumorphic-soft hover:shadow-soft 
                       active:shadow-neumorphic-pressed transition-all duration-200 
                       flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Export All Data
                        </button>
                    </div>
                </div>

                {/* Email Notifications Modal */}
                <div className="mt-8 bg-white rounded-3xl p-6 shadow-soft border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-indigo-600" />
                        Email Notifications
                    </h2>
                    <div className="space-y-4">
                        {Object.entries(emailNotifications).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between py-3">
                                <span className="font-medium text-gray-700 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1')}
                                </span>
                                <button
                                    onClick={() => setEmailNotifications(prev => ({
                                        ...prev,
                                        [key]: !value
                                    }))}
                                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${value
                                        ? 'bg-linear-to-r from-green-500 to-green-600'
                                        : 'bg-linear-to-br from-gray-200 to-gray-300'
                                        } shadow-neumorphic-inset active:shadow-neumorphic-pressed`}
                                >
                                    <div
                                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${value ? 'left-7' : 'left-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={() => {
                            alert('Settings saved successfully!');
                        }}
                        className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 
                     text-white font-semibold shadow-md hover:shadow-lg 
                     active:shadow-neumorphic-pressed transition-all duration-200 
                     flex items-center space-x-2 group"
                    >
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                        <CheckCircle className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>
            </div>

            {/* Delete Account Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-red-700">Delete Account</h3>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <p className="text-gray-600 mb-6">
                            This action cannot be undone. All your data will be permanently deleted.
                            Are you sure you want to proceed?
                        </p>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Type 'DELETE' to confirm"
                                className="w-full px-4 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                         border border-gray-300 text-gray-800 font-medium placeholder-gray-600
                         shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                         focus:border-red-400 transition-all duration-200"
                            />

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                           border border-gray-200 text-gray-700 font-semibold
                           shadow-neumorphic-soft hover:shadow-soft transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        alert('Account deletion initiated');
                                        setShowDeleteModal(false);
                                    }}
                                    className="flex-1 px-4 py-3 rounded-xl bg-linear-to-r from-red-600 to-red-700 
                            text-white font-semibold shadow-md hover:shadow-lg 
                            active:shadow-neumorphic-pressed transition-all duration-200"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
