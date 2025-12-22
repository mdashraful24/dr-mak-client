import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

// Define validation schema with Yup
const loginSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .email('Please enter a valid email address')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format is invalid'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        )
        .max(32, 'Password must not exceed 32 characters'),
    rememberMe: yup.boolean().default(false),
}).required();

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: ''
    });

    const { register, handleSubmit, watch, reset, formState: { errors, isValid, isDirty }, trigger
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });

    // Watch password for real-time strength validation
    const passwordValue = watch('password');

    // Password strength checker
    const checkPasswordStrength = (password) => {
        if (!password) {
            setPasswordStrength({ score: 0, message: '' });
            return;
        }

        let score = 0;
        let messages = [];

        // Length check
        if (password.length >= 8) score += 1;
        else messages.push('At least 8 characters');

        // Lowercase check
        if (/[a-z]/.test(password)) score += 1;
        else messages.push('One lowercase letter');

        // Uppercase check
        if (/[A-Z]/.test(password)) score += 1;
        else messages.push('One uppercase letter');

        // Number check
        if (/\d/.test(password)) score += 1;
        else messages.push('One number');

        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        else messages.push('One special character');

        let message = '';
        if (score >= 4) message = 'Strong password';
        else if (score >= 3) message = 'Medium strength';
        else message = 'Weak password';

        if (messages.length > 0 && score < 5) {
            message += ` - Needs: ${messages.slice(0, 2).join(', ')}`;
        }

        setPasswordStrength({ score, message });
    };

    // Handle password change
    useEffect(() => {
        checkPasswordStrength(passwordValue);
    }, [passwordValue]);

    // Handle form submission
    const onSubmit = async (data) => {
        setIsLoading(true);
        setLoginError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Login successful:', data);

            // Show success message
            alert('Login successful! Welcome back.');

        } catch (error) {
            setLoginError('Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        const email = watch('email');

        if (!email || errors.email) {
            // Trigger email validation
            await trigger('email');
            if (errors.email) {
                setLoginError('Please enter a valid email address to reset password');
            } else {
                setLoginError('Please enter your email address');
            }
            return;
        }

        try {
            setIsLoading(true);
            // Simulate forgot password API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert(`Password reset link sent to ${email}`);
        } catch (error) {
            setLoginError('Failed to send reset link. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="md:min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p>Sign in to your account to continue</p>
                </div>

                {/* Login Form */}
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
                                placeholder="Enter your email"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_7px_7px_14px_#bebebe,inset_-7px_-7px_14px_#ffffff] text-gray-800 placeholder-gray-600 transition-all duration-200"
                            />
                        </div>
                        {errors.email && (
                            <div className="mt-2 flex items-center space-x-2 text-red-500 text-sm font-medium">
                                <AlertCircle size={16} />
                                <span>{errors.email.message}</span>
                            </div>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                                <Lock size={20} />
                            </div>
                            <input
                                {...register('password')}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="w-full pl-12 pr-12 py-3 border border-gray-300 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_7px_7px_14px_#bebebe,inset_-7px_-7px_14px_#ffffff] text-gray-800 placeholder-gray-600 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-700 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {passwordValue && passwordValue.length > 0 && (
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-medium ${passwordStrength.score >= 4 ? 'text-green-600' :
                                        passwordStrength.score >= 3 ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                        {passwordStrength.message}
                                    </span>
                                    {passwordStrength.score >= 4 && !errors.password && (
                                        <CheckCircle size={16} className="text-green-600" />
                                    )}
                                </div>
                                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${passwordStrength.score >= 4 ? 'w-full bg-green-500' :
                                            passwordStrength.score >= 3 ? 'w-3/4 bg-yellow-500' :
                                                'w-1/2 bg-red-500'
                                            }`}
                                    />
                                </div>
                            </div>
                        )}

                        {errors.password && (
                            <div className="mt-2 flex items-center space-x-2 text-red-500 text-sm font-medium">
                                <AlertCircle size={16} />
                                <span>{errors.password.message}</span>
                            </div>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    {...register('rememberMe')}
                                    type="checkbox"
                                    className="sr-only peer"
                                />
                                <div className="w-5 h-5 bg-linear-to-br from-gray-100 to-gray-200 rounded shadow-[inset_2px_2px_4px_#bebebe,inset_2px_2px_4px_#bebebe] group-hover:shadow-[inset_1px_1px_2px_#bebebe,inset_-1px_-1px_2px_#ffffff] transition-all duration-200 peer-checked:shadow-[inset_3px_3px_6px_#60a5fa,inset_-3px_-3px_6px_#93c5fd]"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                </div>
                            </div>
                            <span>Remember me</span>
                        </label>
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                            disabled={isLoading}
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Error Message */}
                    {loginError && (
                        <div className="p-3 bg-linear-to-br from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg shadow">
                            <div className="flex items-center space-x-2 text-red-500">
                                <AlertCircle size={18} />
                                <p className="text-sm font-medium">{loginError}</p>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading || !isValid}
                        className="w-full py-3 bg-linear-to-br from-blue-700 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg active:shadow-[inset_5px_5px_10px_#3b82f6,inset_-5px_-5px_10px_#60a5fa] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] group"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <Loader2 className="animate-spin mr-2" size={20} />
                                Signing in...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                Sign In
                                {isValid && (
                                    <CheckCircle className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                                )}
                            </span>
                        )}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center">
                        <div className="grow h-px bg-gray-400"></div>

                        <span className="mx-3 text-sm whitespace-nowrap">
                            Or continue with
                        </span>

                        <div className="grow h-px bg-gray-400"></div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            disabled={isLoading}
                            className="py-3 bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff] active:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-gray-700 font-medium">Google</span>
                        </button>
                        <button
                            type="button"
                            disabled={isLoading}
                            className="py-3 bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff] active:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="#333" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="text-gray-700 font-medium">GitHub</span>
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p>
                            Don't have an account?{' '}
                            <Link
                                to="/auth/register"
                                className={`font-medium transition-colors ${isLoading ? "text-gray-400 pointer-events-none" : "text-blue-500 hover:text-blue-600"}`}
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
