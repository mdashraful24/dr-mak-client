import { useState } from 'react';
import { Volume2, Bell, BellOff, VolumeX, Sparkles, Mail, MailOpen, Monitor, MonitorOff } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationSettings = () => {
    const [notifications, setNotifications] = useState({
        push: true,
        sound: true,
        email: true,
        desktop: false
    });

    const [volume, setVolume] = useState(70);

    // Enhanced notification items with icons for both states
    const notificationItems = [
        {
            key: 'push',
            icon: Bell,
            iconOff: BellOff,
            title: 'Push Notifications',
            description: 'Receive push notifications',
            bgColor: 'bg-blue-100',
            bgColorOff: 'bg-gray-100',
            iconColor: 'text-blue-600',
            iconColorOff: 'text-gray-500'
        },
        {
            key: 'sound',
            icon: Volume2,
            iconOff: VolumeX,
            title: 'Sound',
            description: 'Play sound for notifications',
            bgColor: 'bg-green-100',
            bgColorOff: 'bg-gray-100',
            iconColor: 'text-green-600',
            iconColorOff: 'text-gray-500'
        },
        {
            key: 'email',
            icon: Mail,
            iconOff: MailOpen,
            title: 'Email Notifications',
            description: 'Receive notifications via email',
            bgColor: 'bg-purple-100',
            bgColorOff: 'bg-gray-100',
            iconColor: 'text-purple-600',
            iconColorOff: 'text-gray-500'
        },
        {
            key: 'desktop',
            icon: Monitor,
            iconOff: MonitorOff,
            title: 'Desktop Notifications',
            description: 'Show notifications on desktop',
            bgColor: 'bg-orange-100',
            bgColorOff: 'bg-gray-100',
            iconColor: 'text-orange-600',
            iconColorOff: 'text-gray-500'
        }
    ];

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
        toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${!notifications[key] ? 'enabled' : 'disabled'}`);
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Notification Settings</h2>
                <p className="text-gray-600 mt-1">Configure how you receive notifications</p>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                    {notificationItems.map(({
                        key,
                        icon: Icon,
                        iconOff: IconOff,
                        title,
                        description,
                        bgColor,
                        bgColorOff,
                        iconColor,
                        iconColorOff
                    }) => {
                        const isEnabled = notifications[key];
                        const CurrentIcon = isEnabled ? Icon : IconOff;

                        return (
                            <div
                                key={key}
                                onClick={() => toggleNotification(key)}
                                className="flex items-center justify-between gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 md:p-3 rounded-lg transition-all duration-300 shadow-head-badge ${isEnabled ? bgColor : bgColorOff
                                        }`}>
                                        <CurrentIcon className={`w-5 h-5 transition-all duration-300 ${isEnabled ? iconColor : iconColorOff
                                            }`} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold flex items-center space-x-2">
                                            <span>{title}</span>
                                            {/* {isEnabled && (
                                                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                                    Active
                                                </span>
                                            )} */}
                                        </h4>
                                        <p className="text-sm text-gray-600">{description}</p>
                                    </div>
                                </div>
                                <button
                                    className={`relative h-7 w-12 rounded-full transition-all duration-300 ${isEnabled
                                        ? 'bg-linear-to-r from-blue-500 to-blue-600'
                                        : 'bg-linear-to-br from-gray-200 to-gray-300'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${isEnabled ? 'left-6' : 'left-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Volume Control - Only show when sound is enabled */}
                {notifications.sound && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <label className="block text-sm font-semibold mb-3">
                            Notification Volume
                        </label>
                        <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg transition-all duration-300 shadow-head-badge ${volume > 0 ? 'bg-green-100' : 'bg-gray-100'
                                }`}>
                                {volume > 0 ? (
                                    <Volume2 className={`w-5 h-5 ${volume > 0 ? 'text-green-600' : 'text-gray-500'
                                        }`} />
                                ) : (
                                    <VolumeX className="w-5 h-5 text-gray-500" />
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 
                                        [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg 
                                        [&::-webkit-slider-thumb]:hover:bg-blue-700
                                        [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full 
                                        [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer
                                        [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:hover:bg-blue-700"
                                />
                            </div>
                            <span className="text-sm font-medium min-w-12 text-gray-700">
                                {volume}%
                            </span>
                        </div>

                        {/* Volume level indicators */}
                        <div className="flex items-center space-x-1 mt-2 ml-14">
                            {[20, 40, 60, 80, 100].map(level => (
                                <div
                                    key={level}
                                    className={`h-1 w-6 rounded-full transition-colors ${volume >= level ? 'bg-blue-500' : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Quiet Hours */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <h4 className="font-semibold mb-3">Quiet Hours</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1 text-gray-600">Start Time</label>
                            <input
                                type="time"
                                defaultValue="22:00"
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 
                                    transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-600">End Time</label>
                            <input
                                type="time"
                                defaultValue="07:00"
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 
                                    transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-700 mt-3">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Notifications will be muted during these hours</span>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={() => toast.success('Notification settings saved!')}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold 
                            hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20
                            focus:outline-none cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;
