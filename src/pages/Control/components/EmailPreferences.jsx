import { Mail, Sparkles, Clock, Shield, Tag, Calendar } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';

const EmailPreferences = () => {
    const { emailNotifications, handleNotificationToggle, updateNotificationsMutation } = useOutletContext();
    const activeCount = Object.values(emailNotifications).filter(Boolean).length;

    const emailTypes = [
        {
            key: 'newsletter',
            title: 'Newsletter',
            description: 'Receive newsletter and updates about new features',
            icon: <Mail className="w-5 h-5" />,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            buttonColor: 'from-blue-500 to-blue-600',
        },
        {
            key: 'promotions',
            title: 'Promotional Offers',
            description: 'Receive promotional offers and discounts',
            icon: <Tag className="w-5 h-5" />,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            buttonColor: 'from-blue-500 to-blue-600',
        },
        {
            key: 'reminders',
            title: 'Appointment Reminders',
            description: 'Get reminders about your appointments',
            icon: <Calendar className="w-5 h-5" />,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            buttonColor: 'from-blue-500 to-blue-600',
        },
        {
            key: 'security',
            title: 'Security Alerts',
            description: 'Important security notifications about your account',
            icon: <Shield className="w-5 h-5" />,
            color: 'from-amber-500 to-amber-600',
            bgColor: 'bg-amber-50',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
            buttonColor: 'from-blue-500 to-blue-600',
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="mb-5">
                <h1 className="text-2xl font-bold">
                    Email Preferences
                </h1>
                <p className="text-gray-600 mt-1">
                    Customize your email experience. Choose what you want to receive and how often.
                </p>
            </div>


            {/* Email Frequency Card */}
            <div className="group relative">
                {/* Background decoration */}
                {/* <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}

                {/* Main card */}
                <div className="relative bg-white rounded-xl border border-gray-200/60 shadow-lg p-3 md:p-4 backdrop-blur-xl">
                    <div className="flex items-start space-x-4">
                        <div className="p-2.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                            <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold">Email Frequency</h3>
                            <p className="text-sm text-gray-600">
                                Control how often you receive email notifications
                            </p>

                            <div className="mt-4 flex flex-wrap gap-3">
                                {['instant', 'daily', 'weekly', 'never'].map((freq) => (
                                    <label key={freq} className="relative flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="frequency"
                                            value={freq}
                                            defaultChecked={freq === 'instant'}
                                            className="peer sr-only"
                                        />
                                        <div className="px-3 py-1.5 rounded-lg border border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-checked:shadow-sm hover:bg-blue-50 hover:border-blue-300 text-sm font-medium capitalize"
                                        >
                                            {freq}
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <p className="text-xs text-gray-600 mt-3 flex items-center">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                                Instant emails are sent immediately for time-sensitive updates
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Email Types Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Notification Types</h2>
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                        {Object.values(emailNotifications).filter(Boolean).length} active
                    </span>
                </div>

                <div className="space-y-3">
                    {emailTypes.map(({ key, title, description, icon, color, iconBg, iconColor, buttonColor }) => {
                        const isLoading = updateNotificationsMutation.isLoading &&
                            updateNotificationsMutation.variables?.key === key;

                        return (
                            <div
                                key={key}
                                className={`group relative overflow-hidden rounded-xl 
                                    ${emailNotifications[key]
                                        ? 'bg-linear-to-r from-blue-50 to-white border-blue-600'
                                    : 'bg-linear-to-br from-gray-50 to-gray-100 border-gray-200/80 hover:border-gray-300/80'
                                    } border hover:shadow-md cursor-pointer`}
                                style={emailNotifications[key] ? { borderLeftColor: color.split(' ')[1] } : {}}
                            >
                                {/* Background decoration */}
                                {/* <div className={`absolute inset-0 ${bgColor} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} /> */}

                                <div
                                    onClick={() => handleNotificationToggle(key)}
                                    className="relative p-3 md:p-4"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center justify-center space-x-4">
                                            {/* Icon with gradient */}
                                            <div className={`relative ${iconBg} p-2 md:p-3 rounded-lg md:rounded-xl shadow-head-badge`}>
                                                <div className={`absolute inset-0 bg-linear-to-br ${color} opacity-0 group-hover:opacity-10 rounded-xl`} />
                                                <div className={iconColor}>
                                                    {icon}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h4 className="font-semibold">
                                                    {title}
                                                </h4>
                                                <p className="text-sm text-gray-700 mt-1 max-w-lg">
                                                    {description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Toggle Switch - Professional Design */}
                                        <div className="relative flex items-center">
                                            <button
                                                // onClick={() => handleNotificationToggle(key)}
                                                disabled={isLoading}
                                                className={`relative inline-flex h-7 w-12 items-center rounded-full ease-in-out focus:outline-none
                                                        ${emailNotifications[key]
                                                        ? `bg-linear-to-r ${buttonColor}`
                                                        : 'bg-gray-200 hover:bg-gray-300'
                                                    }
                                                        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} shadow-inner`}
                                                role="switch"
                                                aria-checked={emailNotifications[key]}
                                            >
                                                <span className="sr-only">
                                                    {emailNotifications[key] ? 'Disable' : 'Enable'} {title}
                                                </span>

                                                {/* Toggle knob */}
                                                <span
                                                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out
                                                    ${emailNotifications[key] ? 'translate-x-6' : 'translate-x-1'}`}
                                                >
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-5 border-t border-gray-200">
                <div className="flex items-center justify-between gap-3">
                    {/* Important Note */}
                    <div className="flex items-center space-x-2 text-xs text-gray-700 bg-gray-50 px-4 py-2 rounded-lg">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span>Essential account emails are always sent</span>
                    </div>


                    {/* Unsubscribe All Button */}
                    <button
                        disabled={activeCount === 0}
                        onClick={() => {
                            const activeKeys = Object.entries(emailNotifications)
                                .filter(([_, value]) => value)
                                .map(([key]) => key);

                            activeKeys.forEach(key => handleNotificationToggle(key));

                            if (activeKeys.length > 0) {
                                toast.success(`Unsubscribed from ${activeKeys.length} email types`);
                            } else {
                                toast.error('No active subscriptions to unsubscribe');
                            }
                        }}
                        className={`group relative px-4 py-2 border border-red-200 rounded-lg overflow-hidden ${activeCount === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer'
                            }`}
                    >
                        <div className={`absolute inset-0 bg-linear-to-r from-red-500 to-red-600 ${activeCount === 0 ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
                        />

                        <div className={`absolute inset-0 bg-red-50 ${activeCount === 0 ? 'opacity-100' : 'group-hover:opacity-0'}`} />

                        <span className={`relative text-sm font-semibold ${activeCount === 0 ? 'text-red-400' : 'text-red-600 group-hover:text-white'}`}>
                            Unsubscribe all
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailPreferences;
