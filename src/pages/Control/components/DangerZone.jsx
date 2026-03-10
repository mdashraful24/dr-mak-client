import { Download, Trash2, AlertTriangle, RefreshCw, Ban, Archive } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';

const DangerZone = () => {
    const { setShowDeleteModal } = useOutletContext();

    const actions = [
        {
            icon: <Download className="w-5 h-5 text-blue-600" />,
            title: 'Export All Data',
            description: 'Download a copy of all your personal data, including profile information, settings, and activity history.',
            buttonText: 'Export Data',
            buttonColor: 'blue',
            action: () => toast.success('Data export started. You will receive an email when ready.')
        },
        {
            icon: <Archive className="w-5 h-5 text-yellow-600" />,
            title: 'Archive Account',
            description: 'Temporarily disable your account. You can reactivate it anytime by logging back in.',
            buttonText: 'Archive Account',
            buttonColor: 'yellow',
            action: () => toast.success('Account archived successfully')
        },
        {
            icon: <RefreshCw className="w-5 h-5 text-orange-600" />,
            title: 'Reset Account',
            description: 'Reset all your settings to default. Your data will be preserved but preferences will be cleared.',
            buttonText: 'Reset Settings',
            buttonColor: 'orange',
            action: () => {
                if (window.confirm('Are you sure you want to reset all settings?')) {
                    toast.success('Settings reset successfully');
                }
            }
        },
        {
            icon: <Ban className="w-5 h-5 text-red-600" />,
            title: 'Deactivate Account',
            description: 'Temporarily disable your account. Your data will be preserved but your profile will be hidden.',
            buttonText: 'Deactivate',
            buttonColor: 'red',
            action: () => {
                if (window.confirm('Are you sure you want to deactivate your account?')) {
                    toast.success('Account deactivated');
                }
            }
        },
        {
            icon: <Trash2 className="w-5 h-5 text-red-700" />,
            title: 'Delete Account',
            description: 'Permanently delete your account and all associated data. This action cannot be undone.',
            buttonText: 'Delete Permanently',
            buttonColor: 'red',
            action: () => setShowDeleteModal(true),
            destructive: true
        }
    ];

    const getButtonClasses = (color, destructive = false) => {
        const baseClasses = "px-3 py-2 rounded-lg text-white text-sm font-semibold transition-colors  shadow-head-badge";
        const colorClasses = {
            blue: "bg-blue-600 hover:bg-blue-700",
            yellow: "bg-yellow-600 hover:bg-yellow-700",
            orange: "bg-orange-600 hover:bg-orange-700",
            red: destructive ? "bg-red-700 hover:bg-red-800" : "bg-red-600 hover:bg-red-700"
        };
        return `${baseClasses} ${colorClasses[color]}`;
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-red-700">Danger Zone</h2>
                <p className="text-red-600 mt-1">Irreversible and destructive actions</p>
            </div>

            {/* Warning Banner */}
            <div className="bg-red-50 border-l-4 border-red-500 px-3 py-2 rounded-l-xl rounded-xl">
                <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-medium text-red-600">Warning</h3>
                        <p className="text-sm text-red-700">
                            The actions in this section can permanently affect your account. Please proceed with caution.
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Cards */}
            <div className="space-y-4">
                {actions.map((action, index) => (
                    <div
                        key={index}
                        className={`p-3 lg:p-4 rounded-xl border transition-all hover:shadow-md
                            ${action.destructive
                                ? 'bg-red-50 border-red-200 hover:bg-red-100'
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className={`p-3 rounded-lg shadow-head-badge ${action.destructive ? 'bg-red-100' : 'bg-white'
                                    }`}>
                                    {action.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{action.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                                        {action.description}
                                    </p>

                                    {action.destructive && (
                                        <div className="mt-2 space-y-1">
                                            <p className="text-xs text-red-600 flex items-center gap-2">
                                                <span>•</span>
                                                <span>All your data will be permanently deleted</span>
                                            </p>
                                            <p className="text-xs text-red-600 flex items-center gap-2">
                                                <span>•</span>
                                                <span>Your username will become available for others</span>
                                            </p>
                                            <p className="text-xs text-red-600 flex items-center gap-2">
                                                <span>•</span>
                                                <span>This action cannot be reversed</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={action.action}
                                className={getButtonClasses(action.buttonColor, action.destructive)}
                            >
                                {action.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DangerZone;
