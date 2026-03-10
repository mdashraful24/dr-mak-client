import { useState } from 'react';
import { X, Loader2, AlertTriangle, Shield, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const DeleteAccountModal = ({ showDeleteModal, setShowDeleteModal, deleteAccountMutation }) => {
    const [confirmText, setConfirmText] = useState('');
    const [selectedReason, setSelectedReason] = useState('');
    const [step, setStep] = useState(1); // 1: confirmation, 2: reason, 3: final

    const reasons = [
        { id: 'not_using', label: "I don't use this account anymore" },
        { id: 'too_expensive', label: 'Too expensive' },
        { id: 'privacy', label: 'Privacy concerns' },
        { id: 'found_alternative', label: 'Found a better alternative' },
        { id: 'other', label: 'Other reason' }
    ];

    const handleClose = () => {
        setShowDeleteModal(false);
        setConfirmText('');
        setSelectedReason('');
        setStep(1);
    };

    const handleNextStep = () => {
        if (step === 1 && confirmText !== 'DELETE') {
            toast.error('Please type DELETE to confirm');
            return;
        }
        if (step === 2 && !selectedReason) {
            toast.error('Please select a reason');
            return;
        }
        setStep(prev => prev + 1);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteAccountMutation.mutate();
    };

    if (!showDeleteModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl p-4 md:p-6 max-w-md w-full shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-100 rounded-full">
                            <AlertTriangle size={20} className="text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold">
                            {step === 3 ? 'Final Step' : 'Delete Account'}
                        </h3>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-lg hover:bg-red-100"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-6">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm
                                ${step >= num
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                                }`}
                            >
                                {step > num ? '✓' : num}
                            </div>
                            {num < 3 && (
                                <div className={`w-12 h-1 mx-2 rounded
                                    ${step > num ? 'bg-red-600' : 'bg-gray-200'}`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {step === 1 && (
                    <>
                        <p className="text-gray-600 mb-6">
                            This action <span className="font-bold text-red-600">cannot be undone</span>.
                            All your data will be permanently deleted. Are you absolutely sure?
                        </p>

                        <div className="bg-red-50 p-4 rounded-xl mb-6">
                            <h4 className="font-medium text-red-800 mb-2">This will:</h4>
                            <ul className="space-y-2 text-sm text-red-700">
                                <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>Permanently delete your profile</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>Remove all your appointments and history</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>Cancel any upcoming appointments</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>Your username will become available for others</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm">
                                Type <span className="font-semibold font-mono bg-gray-200 px-1 rounded">DELETE</span> to confirm
                            </label>
                            <input
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder="DELETE"
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 font-medium placeholder-gray-500 focus:shadow-soft focus:outline-none focus:border-red-400"
                                autoFocus
                            />
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <p className="text-gray-600 mb-6">
                            We're sorry to see you go. Could you tell us why you're leaving?
                            (Optional)
                        </p>

                        <div className="space-y-3 mb-8">
                            {reasons.map((reason) => (
                                <label
                                    key={reason.id}
                                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                                        ${selectedReason === reason.id
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="reason"
                                        value={reason.id}
                                        checked={selectedReason === reason.id}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="w-4 h-4 text-red-600"
                                    />
                                    <span className="ml-3 text-sm text-gray-700">{reason.label}</span>
                                </label>
                            ))}

                            {selectedReason === 'other' && (
                                <textarea
                                    placeholder="Please tell us more..."
                                    className="w-full mt-3 p-3 rounded-lg border border-gray-300 focus:border-red-400 focus:outline-none"
                                    rows="3"
                                />
                            )}
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <Shield className="w-10 h-10 text-red-600" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">
                                Are you absolutely sure?
                            </h4>
                            <p className="text-gray-600">
                                This is your last chance. Once you delete your account, there's no going back.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl mb-6">
                            <div className="flex items-center space-x-3 mb-3">
                                <Mail className="w-4 h-4 text-gray-600" />
                                <span className="text-sm text-gray-600">
                                    We'll send a confirmation email to your registered email address
                                </span>
                            </div>
                            <p className="text-xs text-gray-500">
                                You'll have 24 hours to cancel this deletion by clicking the link in the email.
                            </p>
                        </div>
                    </>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                    {step < 3 ? (
                        <>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 
                                    font-semibold hover:bg-gray-200 
                                    transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleNextStep}
                                disabled={step === 1 && confirmText !== 'DELETE'}
                                className="flex-1 px-4 py-2 rounded-lg bg-red-600 
                                    text-white font-semibold shadow-md hover:bg-red-700 
                                    active:shadow-neumorphic-pressed transition-all duration-200
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 
                                    font-semibold hover:bg-gray-200 
                                    transition-all duration-200"
                            >
                                No, Keep Account
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleteAccountMutation.isLoading}
                                className="flex-1 px-4 py-2 rounded-lg bg-linear-to-r from-red-600 to-red-700 
                                    text-white font-semibold shadow-md hover:shadow-lg 
                                    transition-all duration-200 disabled:opacity-50 
                                    disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {deleteAccountMutation.isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Yes, Delete Forever'
                                )}
                            </button>
                        </>
                    )}
                </div>

                {/* Security Note */}
                <p className="text-xs text-gray-600 text-center mt-4">
                    For your security, this action is logged and verified.
                </p>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
