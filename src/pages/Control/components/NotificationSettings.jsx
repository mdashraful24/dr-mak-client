import { useState } from 'react';
import { Volume2, Bell, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationSettings = () => {
    const [notifications, setNotifications] = useState({
        push: true,
        sound: true,
        email: true,
        desktop: false
    });

    const [volume, setVolume] = useState(70);

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
        toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${!notifications[key] ? 'enabled' : 'disabled'}`);
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold">Notification Settings</h2>
                <p className="text-gray-600 mt-1">Configure how you receive notifications</p>
            </div>

            <div className="space-y-6">
                <div>
                    {/* Push Notifications */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-start space-x-3">
                            <Bell className="w-5 h-5 text-gray-600 mt-1" />
                            <div>
                                <h4 className="font-semibold">Push Notifications</h4>
                                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleNotification('push')}
                            className={`relative w-14 h-8 rounded-full transition-all duration-300 ${notifications.push
                                ? 'bg-linear-to-r from-blue-500 to-blue-600'
                                : 'bg-linear-to-br from-gray-200 to-gray-300'
                                }`}
                        >
                            <div
                                className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg ${notifications.push ? 'left-7' : 'left-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Sound */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-start space-x-3">
                            <Volume2 className="w-5 h-5 text-gray-600 mt-1" />
                            <div>
                                <h4 className="font-semibold">Sound</h4>
                                <p className="text-sm text-gray-600">Play sound for notifications</p>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleNotification('sound')}
                            className={`relative w-14 h-8 rounded-full transition-all duration-300 ${notifications.sound
                                ? 'bg-linear-to-r from-blue-500 to-blue-600'
                                : 'bg-linear-to-br from-gray-200 to-gray-300'
                                }`}
                        >
                            <div
                                className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg ${notifications.sound ? 'left-7' : 'left-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Email Notifications */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-start space-x-3">
                            <Bell className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div>
                                <h4 className="font-semibold">Email Notifications</h4>
                                <p className="text-sm text-gray-600">Receive notifications via email</p>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleNotification('email')}
                            className={`relative w-14 h-8 rounded-full transition-all duration-300 ${notifications.email
                                ? 'bg-linear-to-r from-blue-500 to-blue-600'
                                : 'bg-linear-to-br from-gray-200 to-gray-300'
                                }`}
                        >
                            <div
                                className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg ${notifications.email ? 'left-7' : 'left-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Desktop Notifications */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-start space-x-3">
                            <Bell className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div>
                                <h4 className="font-semibold">Desktop Notifications</h4>
                                <p className="text-sm text-gray-600">Show notifications on desktop</p>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleNotification('desktop')}
                            className={`relative w-14 h-8 rounded-full transition-all duration-300 ${notifications.desktop
                                ? 'bg-linear-to-r from-blue-500 to-blue-600'
                                : 'bg-linear-to-br from-gray-200 to-gray-300'
                                }`}
                        >
                            <div
                                className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg ${notifications.desktop ? 'left-7' : 'left-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Volume Control - Only show when sound is enabled */}
                {notifications.sound && (
                    <div className="animate-fadeIn">
                        <label className="block text-sm font-semibold mb-2">
                            Notification Volume
                        </label>
                        <div className="flex items-center space-x-4">
                            <Volume2 className="w-5 h-5 text-gray-600" />
                            <div className="flex-1">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-full h-2 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer
                                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer
                                        [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:bg-blue-700
                                        [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full 
                                        [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer
                                        [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:hover:bg-blue-700"
                                />
                            </div>
                            <span className="text-sm font-medium min-w-12">
                                {volume}%
                            </span>
                        </div>
                    </div>
                )}

                {/* Quiet Hours */}
                <div>
                    <h4 className="font-semibold mb-2">Quiet Hours</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Start Time</label>
                            <input
                                type="time"
                                defaultValue="22:00"
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 
                                    focus:outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">End Time</label>
                            <input
                                type="time"
                                defaultValue="07:00"
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 
                                    focus:outline-none focus:border-blue-400 transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mt-3">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span>Notifications will be muted during these hours</span>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={() => toast.success('Notification settings saved!')}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;
