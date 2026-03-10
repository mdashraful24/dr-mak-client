import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle, Shield } from 'lucide-react';

const passwordSchema = yup.object({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup
        .string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        .test(
            'not-same-as-current',
            'New password must be different from current password',
            function (value) {
                return this.parent.currentPassword !== value;
            }
        ),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
});

const PasswordSettings = ({ changePasswordMutation }) => {
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        checks: {
            minLength: false,
            uppercase: false,
            lowercase: false,
            number: false,
            special: false
        }
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        reset,
        setError,
        clearErrors
    } = useForm({
        resolver: yupResolver(passwordSchema),
        mode: 'onChange'
    });

    const newPassword = watch('newPassword');
    const currentPassword = watch('currentPassword');

    // Check if new password matches current password
    useEffect(() => {
        if (newPassword && currentPassword && newPassword === currentPassword) {
            setError('newPassword', {
                type: 'manual',
                message: 'New password must be different from current password'
            });
        } else if (errors.newPassword?.type === 'manual' && newPassword !== currentPassword) {
            clearErrors('newPassword');
        }
    }, [newPassword, currentPassword, setError, clearErrors, errors.newPassword]);

    // Check password strength
    useEffect(() => {
        if (newPassword) {
            setPasswordStrength({
                score: [
                    newPassword.length >= 8,
                    /[A-Z]/.test(newPassword),
                    /[a-z]/.test(newPassword),
                    /[0-9]/.test(newPassword),
                    /[^A-Za-z0-9]/.test(newPassword)
                ].filter(Boolean).length,
                checks: {
                    minLength: newPassword.length >= 8,
                    uppercase: /[A-Z]/.test(newPassword),
                    lowercase: /[a-z]/.test(newPassword),
                    number: /[0-9]/.test(newPassword),
                    special: /[^A-Za-z0-9]/.test(newPassword)
                }
            });
        } else {
            setPasswordStrength({
                score: 0,
                checks: {
                    minLength: false,
                    uppercase: false,
                    lowercase: false,
                    number: false,
                    special: false
                }
            });
        }
    }, [newPassword]);

    const onSubmit = (data) => {
        changePasswordMutation.mutate(data, {
            onSuccess: () => reset()
        });
    };

    // Check if form is valid for button state
    const isFormValid = isValid && Object.keys(errors).length === 0;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Update Password</h2>
                <p className="text-gray-600 mt-1">Update your password and security settings</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword.current ? "text" : "password"}
                                {...register('currentPassword')}
                                className={`w-full pl-4 pr-12 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                                    border ${errors.currentPassword ? 'border-red-300' : 'border-gray-300'} 
                                    font-medium placeholder-gray-600
                                    shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                                    focus:border-blue-400 transition-all duration-200`}
                                placeholder="Enter current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.currentPassword.message}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword.new ? "text" : "password"}
                                {...register('newPassword')}
                                className={`w-full pl-4 pr-12 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                                    border ${errors.newPassword ? 'border-red-300' : 'border-gray-300'} 
                                    font-medium placeholder-gray-600
                                    shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                                    focus:border-blue-400 transition-all duration-200`}
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {newPassword && newPassword.length > 0 && (
                            <div className="mt-3 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Shield className={`w-4 h-4 ${passwordStrength.score >= 4 ? 'text-green-600' :
                                            passwordStrength.score >= 3 ? 'text-yellow-600' :
                                                'text-red-600'
                                            }`} />
                                        <span className={`text-sm font-medium ${passwordStrength.score >= 4 ? 'text-green-600' :
                                            passwordStrength.score >= 3 ? 'text-yellow-600' :
                                                'text-red-600'
                                            }`}>
                                            {passwordStrength.score >= 4 ? 'Strong password' :
                                                passwordStrength.score >= 3 ? 'Medium strength' :
                                                    'Weak password'}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {passwordStrength.score}/5
                                    </span>
                                </div>

                                {/* Strength Bar */}
                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${passwordStrength.score >= 4 ? 'w-full bg-green-500' :
                                            passwordStrength.score === 3 ? 'w-3/4 bg-yellow-500' :
                                                passwordStrength.score === 2 ? 'w-1/2 bg-orange-500' :
                                                    'w-1/4 bg-red-500'
                                            }`}
                                    />
                                </div>

                                {/* Password Requirements */}
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {Object.entries(passwordStrength.checks).map(([key, passed]) => (
                                        <div key={key} className="flex items-center space-x-1.5">
                                            {passed ? (
                                                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                            ) : (
                                                <AlertCircle className="w-3.5 h-3.5 text-gray-500" />
                                            )}
                                            <span className={`text-xs ${passed ? 'text-green-600' : 'text-gray-500'}`}>
                                                {key === 'minLength' && '8+ characters'}
                                                {key === 'uppercase' && 'Uppercase letter'}
                                                {key === 'lowercase' && 'Lowercase letter'}
                                                {key === 'number' && 'Number'}
                                                {key === 'special' && 'Special character'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {errors.newPassword && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword.confirm ? "text" : "password"}
                                {...register('confirmPassword')}
                                className={`w-full pl-4 pr-12 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                                    border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} 
                                    font-medium placeholder-gray-600
                                    shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                                    focus:border-blue-400 transition-all duration-200`}
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password Match Indicator */}
                        {newPassword && watch('confirmPassword') && newPassword === watch('confirmPassword') && !errors.confirmPassword && (
                            <p className="mt-1 text-sm text-green-600 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Passwords match
                            </p>
                        )}

                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        disabled={changePasswordMutation?.isLoading || !isFormValid}
                        className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-blue-700 
                            text-white font-semibold shadow-md hover:shadow-lg 
                            active:shadow-[inset_5px_5px_10px_#2563eb,inset_-5px_-5px_10px_#3b82f6] 
                            transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed 
                            disabled:hover:shadow-md flex items-center justify-center min-w-40"
                    >
                        {changePasswordMutation?.isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Changing...
                            </>
                        ) : (
                            'Change Password'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordSettings;
