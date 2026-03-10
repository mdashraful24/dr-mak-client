import { useState } from 'react';
import {
    ShieldCheck,
    Globe,
    Lock,
    Eye,
    History,
    Smartphone,
    Key,
    Fingerprint,
    AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

const PrivacySettings = () => {
    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        twoFactorEnabled: false,
        biometricEnabled: false,
        saveActivity: true,
        shareData: false
    });

    const [activeSessions, setActiveSessions] = useState([
        { id: 1, device: 'Chrome on Windows', location: 'New York, USA', lastActive: 'Now', current: true },
        { id: 2, device: 'Safari on iPhone', location: 'New York, USA', lastActive: '2 hours ago' },
        { id: 3, device: 'Firefox on Mac', location: 'Boston, USA', lastActive: '2 days ago' }
    ]);

    const toggleSetting = (key) => {
        setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
        toast.success('Setting updated');
    };

    const handleVisibilityChange = (e) => {
        setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }));
        toast.success('Profile visibility updated');
    };

    const handleSessionLogout = (sessionId) => {
        setActiveSessions(prev => prev.filter(s => s.id !== sessionId));
        toast.success('Session terminated');
    };

    const handleLogoutAll = () => {
        setActiveSessions(prev => prev.filter(s => s.current));
        toast.success('All other sessions logged out');
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Privacy & Security</h2>
                <p className="text-gray-600 mt-1">Manage your privacy and security settings</p>
            </div>

            {/* Two-Factor Authentication */}
            <div className="p-3 md:p-4 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg shadow-head-badge">
                            <ShieldCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                    </div>
                    <button
                        onClick={() => toggleSetting('twoFactorEnabled')}
                        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${privacySettings.twoFactorEnabled
                                ? 'bg-linear-to-r from-green-500 to-green-600'
                                : 'bg-linear-to-br from-gray-200 to-gray-300'
                            }`}
                    >
                        <div
                            className={`absolute top-1 w-6 h-6 rounded-full bg-white transform transition-transform duration-300 shadow-lg ${privacySettings.twoFactorEnabled ? 'left-7' : 'left-1'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Biometric Authentication */}
            <div className="p-3 md:p-4 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg shadow-head-badge">
                            <Fingerprint className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Biometric Authentication</h3>
                            <p className="text-sm text-gray-600">Use fingerprint or face recognition to log in</p>
                        </div>
                    </div>
                    <button
                        onClick={() => toggleSetting('biometricEnabled')}
                        disabled={!window.PublicKeyCredential}
                        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${privacySettings.biometricEnabled
                                ? 'bg-linear-to-r from-green-500 to-green-600'
                                : 'bg-linear-to-br from-gray-200 to-gray-300'
                            } ${!window.PublicKeyCredential ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div
                            className={`absolute top-1 w-6 h-6 rounded-full bg-white transform transition-transform duration-300 shadow-lg ${privacySettings.biometricEnabled ? 'left-7' : 'left-1'
                                }`}
                        />
                    </button>
                </div>
                {!window.PublicKeyCredential && (
                    <p className="text-xs text-amber-600">Biometric authentication is not supported on this device</p>
                )}
            </div>

            {/* Profile Visibility */}
            <div className="p-3 md:p-4 bg-white rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">Profile Visibility</h3>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10">
                    <label className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="visibility"
                            value="public"
                            checked={privacySettings.profileVisibility === 'public'}
                            onChange={handleVisibilityChange}
                            className="w-4 h-4 text-blue-600"
                        />
                        <div>
                            <span className="text-sm font-medium">Public</span>
                            <p className="text-xs text-gray-600">Anyone can see your profile</p>
                        </div>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="visibility"
                            value="private"
                            checked={privacySettings.profileVisibility === 'private'}
                            onChange={handleVisibilityChange}
                            className="w-4 h-4 text-blue-600"
                        />
                        <div>
                            <span className="text-sm font-medium">Private</span>
                            <p className="text-xs text-gray-600">Only you can see your profile</p>
                        </div>
                    </label>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="p-3 md:p-4 bg-white rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        <h3 className="font-semibold">Active Sessions</h3>
                    </div>
                    {activeSessions.length > 1 && (
                        <button
                            onClick={handleLogoutAll}
                            className="text-sm font-medium text-red-600 hover:text-red-500 hover:bg-red-50 px-2 py-1.5 border border-gray-300 hover:border-red-300 rounded-lg shadow-head-badge cursor-pointer"
                        >
                            Logout all devices
                        </button>
                    )}
                </div>
                <div className="space-y-3">
                    {activeSessions.map((session) => (
                        <div
                            key={session.id}
                            className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
                        >
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium">
                                        {session.device}
                                    </span>
                                    {session.current && (
                                        <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                                            Current
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-gray-600">{session.location}</span>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs text-gray-600">{session.lastActive}</span>
                                </div>
                            </div>
                            {!session.current && (
                                <button
                                    onClick={() => handleSessionLogout(session.id)}
                                    className="text-sm font-medium text-red-600 hover:text-red-500 hover:bg-red-50 px-2 py-1 border border-gray-300 hover:border-red-300 rounded-lg shadow-head-badge cursor-pointer"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrivacySettings;
