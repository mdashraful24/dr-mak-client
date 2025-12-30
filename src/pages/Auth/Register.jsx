import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, AlertCircle, Loader2, Shield, ChevronRight } from 'lucide-react';

// Define validation schema with Yup
const registerSchema = yup.object({
    fullName: yup
        .string()
        .required('Full name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
    email: yup
        .string()
        .required('Email is required')
        .email('Please enter a valid email address')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format is invalid'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one uppercase, one lowercase, one number and one special character'
        )
        .max(32, 'Password must not exceed 32 characters'),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    agreeToTerms: yup
        .boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
    newsletter: yup.boolean().default(false)
}).required();

const Register = () => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: '',
        checks: {
            length: false,
            lowercase: false,
            uppercase: false,
            number: false,
            special: false
        }
    });

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isDirty },
        reset
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: 'onChange',
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
            newsletter: true
        }
    });

    // Watch password fields
    const passwordValue = watch('password');
    const confirmPasswordValue = watch('confirmPassword');

    // Password strength checker
    const checkPasswordStrength = (password) => {
        if (!password) {
            setPasswordStrength({
                score: 0,
                message: '',
                checks: {
                    length: false,
                    lowercase: false,
                    uppercase: false,
                    number: false,
                    special: false
                }
            });
            return;
        }

        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };

        const score = Object.values(checks).filter(Boolean).length;

        let message = '';
        if (score >= 4) message = 'Strong password';
        else if (score >= 3) message = 'Medium strength';
        else message = 'Weak password';

        setPasswordStrength({ score, message, checks });
    };

    // Handle password change
    useEffect(() => {
        checkPasswordStrength(passwordValue);
    }, [passwordValue]);

    // Handle form submission
    const onSubmit = async (data) => {
        setIsLoading(true);
        setRegisterError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Registration successful:', {
                ...data,
                // Remove confirmPassword from data sent to API
                confirmPassword: undefined
            });

            // Show success message
            alert('Registration successful! Welcome to our platform.');

            // Navigate to login page with pre-filled email
            navigate('/auth/login', {
                state: {
                    email: data.email,
                    registrationSuccess: true
                }
            });

        } catch (error) {
            setRegisterError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div className="md:min-h-screen flex items-center justify-center p-4 py-8">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-blue-50 to-blue-100 rounded-full mb-4 border border-gray-200 drop-shadow">
                        <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p>Join our community today</p>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Full Name Input */}
                    <div>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                                <User size={20} />
                            </div>
                            <input
                                {...register('fullName')}
                                type="text"
                                placeholder="Full Name"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl shadow-[inset_5px_5px_6px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_5px_5px_10px_#bebebe,inset_-7px_-7px_14px_#ffffff] text-gray-800 placeholder-gray-600 transition-all duration-200"
                            />
                        </div>
                        {errors.fullName && (
                            <div className="mt-2 flex items-center space-x-2 text-red-500 text-sm font-medium">
                                <AlertCircle size={16} />
                                <span>{errors.fullName.message}</span>
                            </div>
                        )}
                    </div>

                    {/* Email Input */}
                    <div>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                                <Mail size={20} />
                            </div>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl shadow-[inset_5px_5px_6px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_5px_5px_10px_#bebebe,inset_-7px_-7px_14px_#ffffff] text-gray-800 placeholder-gray-600 transition-all duration-200"
                            />
                        </div>
                        {errors.email && (
                            <div className="mt-2 flex items-center space-x-2 text-red-500 text-sm font-medium">
                                <AlertCircle size={16} />
                                <span>{errors.email.message}</span>
                            </div>
                        )}
                    </div>

                    {/* Phone Input */}
                    <div>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                                <Phone size={20} />
                            </div>
                            <input
                                {...register('phone')}
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl shadow-[inset_5px_5px_6px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_5px_5px_10px_#bebebe,inset_-7px_-7px_14px_#ffffff] text-gray-800 placeholder-gray-600 transition-all duration-200"
                            />
                        </div>
                        {errors.phone && (
                            <div className="mt-2 flex items-center space-x-2 text-red-500 text-sm font-medium">
                                <AlertCircle size={16} />
                                <span>{errors.phone.message}</span>
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
                                type={showPassword.password ? 'text' : 'password'}
                                placeholder="Create Password"
                                className="w-full pl-12 pr-12 py-3 border border-gray-300 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl shadow-[inset_5px_5px_6px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_5px_5px_10px_#bebebe,inset_-7px_-7px_14px_#ffffff] text-gray-800 placeholder-gray-600 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('password')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-700 transition-colors"
                            >
                                {showPassword.password ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {passwordValue && passwordValue.length > 0 && (
                            <div className="mt-3 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm font-medium ${passwordStrength.score >= 4 ? 'text-green-600' :
                                        passwordStrength.score >= 3 ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                        {passwordStrength.message}
                                    </span>
                                    {passwordStrength.score >= 4 && !errors.password && (
                                        <CheckCircle size={16} className="text-green-600" />
                                    )}
                                </div>

                                {/* Strength Bar */}
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${passwordStrength.score >= 4 ? 'w-full bg-green-500' :
                                            passwordStrength.score >= 3 ? 'w-3/4 bg-yellow-500' :
                                                passwordStrength.score >= 2 ? 'w-1/2 bg-orange-500' :
                                                    'w-1/4 bg-red-500'
                                            }`}
                                    />
                                </div>

                                {/* Password Requirements */}
                                <div className="grid grid-cols-2 gap-2 mt-3">
                                    {Object.entries(passwordStrength.checks).map(([key, passed]) => (
                                        <div key={key} className="flex items-center space-x-2">
                                            {passed ? (
                                                <CheckCircle size={14} className="text-green-500" />
                                            ) : (
                                                <AlertCircle size={14} className="text-gray-400" />
                                            )}
                                            <span className={`text-xs ${passed ? 'text-green-600' : 'text-gray-500'}`}>
                                                {key === 'length' && '8+ characters'}
                                                {key === 'lowercase' && 'Lowercase letter'}
                                                {key === 'uppercase' && 'Uppercase letter'}
                                                {key === 'number' && 'Number'}
                                                {key === 'special' && 'Special character'}
                                            </span>
                                        </div>
                                    ))}
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

                    {/* Confirm Password Input */}
                    <div>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                                <Lock size={20} />
                            </div>
                            <input
                                {...register('confirmPassword')}
                                type={showPassword.confirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                className="w-full pl-12 pr-12 py-3 border border-gray-300 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl shadow-[inset_5px_5px_6px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_5px_5px_10px_#bebebe,inset_-7px_-7px_14px_#ffffff] text-gray-800 placeholder-gray-600 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-700 transition-colors"
                            >
                                {showPassword.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {errors.confirmPassword && (
                            <div className="mt-2 flex items-center space-x-2 text-red-500 text-sm font-medium">
                                <AlertCircle size={16} />
                                <span>{errors.confirmPassword.message}</span>
                            </div>
                        )}

                        {/* Password Match Indicator */}
                        {confirmPasswordValue && confirmPasswordValue.length > 0 && !errors.confirmPassword && (
                            <div className="mt-2 flex items-center space-x-2 text-green-600 text-sm font-medium">
                                <CheckCircle size={16} />
                                <span>Passwords match</span>
                            </div>
                        )}
                    </div>

                    {/* Terms and Newsletter */}
                    <div className="space-y-4">
                        {/* Terms Agreement */}
                        <label className="flex items-start space-x-3 cursor-pointer group">
                            <div className="relative mt-1">
                                <input
                                    {...register('agreeToTerms')}
                                    type="checkbox"
                                    className="sr-only peer"
                                />
                                <div className="w-5 h-5 bg-linear-to-br from-gray-100 to-gray-200 rounded shadow-[inset_2px_2px_4px_#bebebe,inset_2px_2px_4px_#bebebe] group-hover:shadow-[inset_1px_1px_2px_#bebebe,inset_-1px_-1px_2px_#ffffff] transition-all duration-200 peer-checked:shadow-[inset_3px_3px_6px_#60a5fa,inset_-3px_-3px_6px_#93c5fd]"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                </div>
                            </div>
                            <span className="text-sm">
                                I agree to the{' '}
                                <Link to="/terms" className="text-blue-500 hover:text-blue-600 font-medium">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-blue-500 hover:text-blue-600 font-medium">
                                    Privacy Policy
                                </Link>
                            </span>
                        </label>
                        {errors.agreeToTerms && (
                            <div className="flex items-center space-x-2 text-red-500 text-sm font-medium">
                                <AlertCircle size={16} />
                                <span>{errors.agreeToTerms.message}</span>
                            </div>
                        )}

                        {/* Newsletter Subscription */}
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    {...register('newsletter')}
                                    type="checkbox"
                                    className="sr-only peer"
                                />
                                <div className="w-5 h-5 bg-linear-to-br from-gray-100 to-gray-200 rounded shadow-[inset_2px_2px_4px_#bebebe,inset_2px_2px_4px_#bebebe] group-hover:shadow-[inset_1px_1px_2px_#bebebe,inset_-1px_-1px_2px_#ffffff] transition-all duration-200 peer-checked:shadow-[inset_3px_3px_6px_#10b981,inset_-3px_-3px_6px_#34d399]"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                                </div>
                            </div>
                            <span className="text-sm">Subscribe to our newsletter for updates</span>
                        </label>
                    </div>

                    {/* Error Message */}
                    {registerError && (
                        <div className="p-3 bg-linear-to-br from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg shadow">
                            <div className="flex items-center space-x-2 text-red-500">
                                <AlertCircle size={18} />
                                <p className="text-sm font-medium">{registerError}</p>
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
                                Creating Account...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                Create Account
                                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </span>
                        )}
                    </button>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/auth/login"
                                className={`font-medium transition-colors ${isLoading ? "pointer-events-none" : "text-blue-500 hover:text-blue-600"}`}
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>

                {/* Security Information */}
                <div className="mt-5 p-2 bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg shadow">
                    <div className="flex items-start space-x-3">
                        <Shield size={18} className="mt-0.5 text-blue-600 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-blue-800 mb-1">Your Security Matters</h3>
                            <p className="text-sm text-blue-700">
                                We use industry-standard encryption to protect your data. Your password is never stored in plain text.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Validation Status */}
                {isDirty && (
                    <div className="mt-4 p-3 bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow">
                        <div className="flex items-center justify-between text-sm">
                            <span>Registration Status:</span>
                            <span className={`font-medium ${isValid ? 'text-green-600' : 'text-yellow-600'}`}>
                                {isValid ? 'Ready to register ✓' : `${Object.keys(errors).length} error(s) to fix`}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
