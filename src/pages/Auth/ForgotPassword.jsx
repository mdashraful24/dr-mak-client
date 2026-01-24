import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Define validation schema
const forgotPasswordSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .email('Please enter a valid email address')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format is invalid'),
}).required();

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    // Get email from location state if available
    const emailFromState = location.state?.email || '';

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        mode: 'onChange',
        defaultValues: {
            email: emailFromState, // Pre-fill with email from login page
        }
    });

    // Handle form submission
    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Reset password request for:', data.email);

            // Show success state
            setIsSubmitted(true);
            setError('');

            // Start countdown for resend email
            setCountdown(60);
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

        } catch (error) {
            setError('Failed to send reset link. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendEmail = async () => {
        if (countdown > 0) return;

        const email = watch('email');
        if (!email || errors.email) return;

        setIsLoading(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Restart countdown
            setCountdown(60);
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            alert(`Reset link has been resent to ${email}`);
        } catch (error) {
            setError('Failed to resend email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        // Pass back the email to login page if needed
        navigate('/auth/login', { state: { email: watch('email') } });
    };

    return (
        <div className="md:min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back to Login Button */}
                <button
                    onClick={handleBackToLogin}
                    className="mb-6 flex items-center space-x-1 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Login</span>
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-50 to-blue-100 rounded-full mb-4 border border-gray-200 drop-shadow">
                        <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-3">Forgot Password</h1>
                    <p className="max-w-sm mx-auto">
                        {isSubmitted
                            ? 'Check your email for the password reset link'
                            : 'Enter your email address and we\'ll send you a link to reset your password'
                        }
                    </p>
                    {emailFromState && !isSubmitted && (
                        <p className="text-sm text-green-600 mt-2">
                            <CheckCircle size={14} className="inline mr-1" />
                            Email pre-filled from login attempt
                        </p>
                    )}
                </div>

                {!isSubmitted ? (
                    /* Request Reset Form */
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                                    <Mail size={20} />
                                </div>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl shadow-[inset_5px_5px_6px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_5px_5px_10px_#bebebe,inset_-7px_-7px_14px_#ffffff] placeholder-gray-600 transition-all duration-200"
                                />
                            </div>
                            {errors.email && (
                                <div className="mt-2 flex items-center space-x-2 text-red-500 text-sm font-medium">
                                    <AlertCircle size={16} />
                                    <span>{errors.email.message}</span>
                                </div>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-linear-to-br from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg shadow">
                                <div className="flex items-center space-x-2 text-red-500">
                                    <AlertCircle size={18} />
                                    <p className="text-sm font-medium">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !isValid}
                            className="w-full py-3 bg-linear-to-br from-blue-700 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg active:shadow-[inset_5px_5px_10px_#2563eb,inset_-5px_-5px_10px_#3b82f6] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Sending reset link...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    Send Reset Link
                                    {isValid && (
                                        <CheckCircle className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                                    )}
                                </span>
                            )}
                        </button>

                        {/* Tips */}
                        <div className="p-4 bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                                <Shield size={16} className="mr-2" />
                                Password Reset Tips
                            </h3>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    Check your spam folder if you don't see the email
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    Reset links expire after 1 hour
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    Use a strong, unique password for your account
                                </li>
                            </ul>
                        </div>
                    </form>
                ) : (
                    /* Success State */
                    <div className="space-y-6">
                        {/* Success Message */}
                        <div className="p-3 bg-linear-to-br from-green-50 to-green-100 border border-green-300 rounded-lg drop-shadow">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-green-800">Check your email!</h3>
                                    <p className="text-sm text-green-700 mt-1">
                                        We've sent a password reset link to{' '}
                                        <span className="font-medium">{watch('email')}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Resend Email Button */}
                        <button
                            onClick={handleResendEmail}
                            disabled={isLoading || countdown > 0}
                            className="w-full py-3 font-medium bg-linear-to-br from-gray-50 to-gray-100 border border-gray-300 rounded-lg shadow-sm hover:shadow-md active:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Resending...
                                </span>
                            ) : countdown > 0 ? (
                                <span>Resend email in {countdown}s</span>
                            ) : (
                                <span>Resend reset link</span>
                            )}
                        </button>

                        {/* Back to Login Button */}
                        <button
                            onClick={handleBackToLogin}
                            className="w-full py-3 bg-linear-to-br from-blue-50 to-blue-100 border border-blue-300 text-blue-700 font-semibold rounded-lg shadow-sm hover:shadow-md active:shadow-[inset_3px_3px_6px_#93c5fd,inset_-3px_-3px_6px_#dbeafe] transition-all duration-200"
                        >
                            Return to Login
                        </button>

                        {/* Didn't Receive Email? */}
                        <div className="text-center p-3 border border-gray-300 rounded-lg shadow">
                            <p className="text-sm mb-2">
                                Didn't receive the email?
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                            >
                                Try another email address
                            </button>
                        </div>
                    </div>
                )}

                {/* Contact Support */}
                <div className="my-5 flex items-center gap-2">
                    <div className="grow h-px bg-gray-400"></div>
                    <p className="text-sm">
                        Need help?{' '}
                        <Link
                            to="/contact"
                            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            Contact Support
                        </Link>
                    </p>
                    <div className="grow h-px bg-gray-400"></div>
                </div>

                {/* Security Note */}
                <div className="p-3 bg-linear-to-br from-gray-50 to-gray-100 border border-gray-300 rounded-lg drop-shadow">
                    <div className="flex items-start space-x-2">
                        <Shield size={14} className="mt-0.5 shrink-0" />
                        <p className="text-xs">
                            For security reasons, password reset links expire after 1 hour.
                            Never share your reset link with anyone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
