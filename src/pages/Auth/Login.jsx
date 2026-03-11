import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle, CheckCircle, Home } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { jwtDecode } from 'jwt-decode';

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
        .max(32, 'Password must not exceed 32 characters'),
    rememberMe: yup.boolean().default(false),
}).required();

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: ''
    });
    const [touchedFields, setTouchedFields] = useState({
        email: false,
        password: false
    });

    // ✅ Add setAccessToken to destructuring
    const { setUser, setAccessToken, setLoading, googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // Get email from registration if available
    const registrationEmail = location.state?.email || '';

    const { register, handleSubmit, watch, setValue, formState: { errors, isValid, isDirty } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: registrationEmail,
            password: '',
            rememberMe: false
        }
    });

    // Watch form fields
    const passwordValue = watch('password');
    const emailValue = watch('email');

    // Handle field blur to mark as touched
    const handleFieldBlur = (fieldName) => {
        setTouchedFields(prev => ({
            ...prev,
            [fieldName]: true
        }));
    };

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

    // Handle form submission with custom database authentication
    const onSubmit = async (data) => {
        setIsLoading(true);
        setLoginError('');
        setLoginSuccess(false);

        try {
            const response = await axiosPublic.post('/users/login', {
                email: data.email,
                password: data.password
            });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Login failed');
            }

            // ✅ Store access_token from backend
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);

                const decoded = jwtDecode(response.data.access_token);

                const userFromToken = {
                    _id: decoded.id || decoded._id || decoded.sub,
                    id: decoded.id || decoded._id || decoded.sub,
                    email: decoded.email,
                    name: decoded.name,
                    role: decoded.role || 'user',
                };

                setUser(userFromToken);
                setAccessToken(response.data.access_token); // ✅ Now defined
            }

            if (data.rememberMe) {
                localStorage.setItem('rememberedEmail', data.email); // Save email
            } else {
                localStorage.removeItem('rememberedEmail'); // Only remove if unchecked
            }

            setLoginSuccess(true);
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500);

        } catch (error) {
            console.error('Login error:', error);

            let errorMessage = error.message || 'Login failed. Please check your credentials.';

            if (error.response?.status === 404) {
                errorMessage = 'User not found. Please register first.';
            } else if (error.response?.status === 401) {
                errorMessage = 'Invalid email or password.';
            } else if (error.response?.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            } else if (error.code === 'ERR_NETWORK') {
                errorMessage = 'Network error. Please check your internet connection.';
            }

            setLoginError(errorMessage);
            setIsLoading(false);
            setLoading(false);
        }
    };

    // Check for remembered settings on component mount
    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');

        if (rememberedEmail) {
            setValue('email', rememberedEmail);
            setValue('rememberMe', true);
        }
    }, [setValue]);

    // Show registration success message if redirected from registration
    useEffect(() => {
        if (location.state?.registrationSuccess) {
            setLoginSuccess(true);
            setTimeout(() => {
                setLoginSuccess(false);
            }, 5000);
        }
    }, [location.state]);

    return (
        <div className="md:min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Return to Home Button */}
                <div className="mb-6">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                    >
                        <Home size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Return to Home</span>
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Login to your account to continue</p>
                </div>

                {/* Success Message */}
                {loginSuccess && (
                    <div className="mb-4 p-3 bg-linear-to-br from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg shadow animate-pulse">
                        <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle size={18} />
                            <p className="text-sm font-medium">
                                {location.state?.registrationSuccess
                                    ? 'Registration successful! Please login with your credentials.'
                                    : 'Login successful! Redirecting...'
                                }
                            </p>
                        </div>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
                                className={`w-full pl-12 pr-4 py-3 border ${touchedFields.email && errors.email ? 'border-red-300' : 'border-gray-300'} bg-linear-to-br from-gray-50 to-gray-100 rounded-xl shadow-[inset_5px_5px_6px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_5px_5px_10px_#bebebe,inset_-7px_-7px_14px_#ffffff] text-gray-800 placeholder-gray-600 transition-all duration-200`}
                                disabled={isLoading}
                                onBlur={() => handleFieldBlur('email')}
                            />
                        </div>
                        {/* Show error only if field has been touched */}
                        {touchedFields.email && errors.email && (
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
                                className={`w-full pl-12 pr-12 py-3 border ${touchedFields.password && errors.password ? 'border-red-300' : 'border-gray-300'} bg-linear-to-br from-gray-50 to-gray-100 rounded-xl shadow-[inset_5px_5px_6px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_5px_5px_10px_#bebebe,inset_-7px_-7px_14px_#ffffff] text-gray-800 placeholder-gray-600 transition-all duration-200`}
                                disabled={isLoading}
                                onBlur={() => handleFieldBlur('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-700 transition-colors disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Password Strength Indicator - Always show when typing */}
                        {/* {passwordValue && passwordValue.length > 0 && (
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
                        )} */}

                        {/* Show password error only if field has been touched */}
                        {touchedFields.password && errors.password && (
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
                                    disabled={isLoading}
                                />
                                <div className={`w-5 h-5 bg-linear-to-br from-gray-100 to-gray-200 rounded shadow-[inset_2px_2px_4px_#bebebe,inset_2px_2px_4px_#bebebe] group-hover:shadow-[inset_1px_1px_2px_#bebebe,inset_-1px_-1px_2px_#ffffff] transition-all duration-200 peer-checked:shadow-[inset_3px_3px_6px_#60a5fa,inset_-3px_-3px_6px_#93c5fd] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                </div>
                            </div>
                            <span className={isLoading ? 'opacity-50' : ''}>Remember me</span>
                        </label>
                        <Link
                            to="/auth/forgot-password"
                            state={{ email: emailValue }}
                            className={`text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            Forgot password?
                        </Link>
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
                        className="w-full py-3 bg-linear-to-br from-blue-700 to-blue-600 text-white font-semibold rounded-lg cursor-pointer shadow-md hover:shadow-lg active:shadow-[inset_5px_5px_10px_#2563eb,inset_-5px_-5px_10px_#3b82f6] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group mt-2"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <Loader2 className="animate-spin mr-2" size={20} />
                                Signing in...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                Login now
                                {isValid && (
                                    <CheckCircle className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                                )}
                            </span>
                        )}
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-sm text-center">
                        <p className={isLoading ? 'opacity-50' : ''}>
                            Don't have an account?{' '}
                            <Link
                                to="/auth/register"
                                className={`font-medium transition-colors ${isLoading ? "pointer-events-none opacity-50" : "text-blue-500 hover:text-blue-600"}`}
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </form>

                {/* Form Validation Status */}
                {/* {isDirty && (
                    <div className="mt-6 p-3 bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow">
                        <div className="flex items-center justify-between text-sm">
                            <span>Form Status:</span>
                            <span className={`font-medium ${isValid ? 'text-green-600' : 'text-yellow-600'}`}>
                                {isValid ? 'Ready to submit ✓' : 'Please fix errors'}
                            </span>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Login;








// User Login with Firebase
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle, CheckCircle, Facebook, Home } from 'lucide-react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
// import useAxiosPublic from '../../hooks/useAxiosPublic';

// // Define validation schema with Yup
// const loginSchema = yup.object({
//     email: yup
//         .string()
//         .required('Email is required')
//         .email('Please enter a valid email address')
//         .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format is invalid'),
//     password: yup
//         .string()
//         .required('Password is required')
//         .min(6, 'Password must be at least 6 characters')
//         .max(32, 'Password must not exceed 32 characters'),
//     rememberMe: yup.boolean().default(false),
// }).required();

// const Login = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [loginError, setLoginError] = useState('');
//     const [loginSuccess, setLoginSuccess] = useState(false);
//     const [passwordStrength, setPasswordStrength] = useState({
//         score: 0,
//         message: ''
//     });
//     const [useFirebaseAuth, setUseFirebaseAuth] = useState(true); // Toggle between Firebase and custom auth

//     const { signIn, googleSignIn, setUser, setLoading } = useAuth();
//     const axiosPublic = useAxiosPublic();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || '/';

//     // Get email from registration if available
//     const registrationEmail = location.state?.email || '';

//     const { register, handleSubmit, watch, setValue, formState: { errors, isValid, isDirty } } = useForm({
//         resolver: yupResolver(loginSchema),
//         mode: 'onChange',
//         defaultValues: {
//             email: registrationEmail,
//             password: '',
//             rememberMe: false
//         }
//     });

//     // Watch form fields
//     const passwordValue = watch('password');
//     const emailValue = watch('email');

//     // Password strength checker
//     const checkPasswordStrength = (password) => {
//         if (!password) {
//             setPasswordStrength({ score: 0, message: '' });
//             return;
//         }

//         let score = 0;
//         let messages = [];

//         // Length check
//         if (password.length >= 8) score += 1;
//         else messages.push('At least 8 characters');

//         // Lowercase check
//         if (/[a-z]/.test(password)) score += 1;
//         else messages.push('One lowercase letter');

//         // Uppercase check
//         if (/[A-Z]/.test(password)) score += 1;
//         else messages.push('One uppercase letter');

//         // Number check
//         if (/\d/.test(password)) score += 1;
//         else messages.push('One number');

//         // Special character check
//         if (/[^A-Za-z0-9]/.test(password)) score += 1;
//         else messages.push('One special character');

//         let message = '';
//         if (score >= 4) message = 'Strong password';
//         else if (score >= 3) message = 'Medium strength';
//         else message = 'Weak password';

//         if (messages.length > 0 && score < 5) {
//             message += ` - Needs: ${messages.slice(0, 2).join(', ')}`;
//         }

//         setPasswordStrength({ score, message });
//     };

//     // Handle password change
//     useEffect(() => {
//         checkPasswordStrength(passwordValue);
//     }, [passwordValue]);

//     // Helper function to save user to database (for both Firebase and Google login)
//     const saveUserToDatabase = async (userData) => {
//         try {
//             // console.log('Saving user to database:', userData);

//             // First check if user exists
//             try {
//                 const checkResponse = await axiosPublic.get(`/users/email/${userData.email}`);

//                 if (checkResponse.data && !checkResponse.data.error) {
//                     // User exists, update
//                     const updateResponse = await axiosPublic.patch(`/users/email/${userData.email}`, {
//                         ...userData,
//                         updatedAt: new Date().toISOString()
//                     });
//                     // console.log('User updated in database:', updateResponse.data);
//                     return { success: true, action: 'updated', data: updateResponse.data };
//                 }
//             } catch (checkError) {
//                 // console.log('User not found, will create new record');
//             }

//             // User doesn't exist, create new
//             const createResponse = await axiosPublic.post('/users', {
//                 ...userData,
//                 createdAt: new Date().toISOString(),
//                 updatedAt: new Date().toISOString()
//             });

//             // console.log('User created in database:', createResponse.data);
//             return { success: true, action: 'created', data: createResponse.data };

//         } catch (dbError) {
//             console.error('Error saving user to database:', dbError);
//             return {
//                 success: false,
//                 error: dbError.message || 'Failed to save user to database'
//             };
//         }
//     };

//     // OPTION 1: Handle form submission with Firebase Authentication
//     const handleFirebaseLogin = async (data) => {
//         setIsLoading(true);
//         setLoginError('');
//         setLoginSuccess(false);

//         try {
//             // Step 1: Firebase Authentication
//             const userCredential = await signIn(data.email, data.password);
//             const firebaseUser = userCredential.user;

//             // Step 2: Prepare user data for database
//             const userData = {
//                 uid: firebaseUser.uid,
//                 email: firebaseUser.email,
//                 name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
//                 photoURL: firebaseUser.photoURL || null,
//                 phone: '', // Firebase doesn't provide phone on email login
//                 role: 'user',
//                 status: 'active',
//                 provider: 'email/password',
//                 loginMethod: 'email/password', // Track login method
//                 emailVerified: firebaseUser.emailVerified || false,
//                 password: data.password, // Store password (will be hashed in backend)
//                 lastLogin: new Date().toISOString()
//             };

//             // Step 3: Save user to database (blocking - wait for it to complete)
//             const saveResult = await saveUserToDatabase(userData);

//             if (!saveResult.success) {
//                 console.warn('Failed to save user to database:', saveResult.error);
//                 // Continue login even if database save fails
//             }

//             // Step 4: Update auth context user
//             setUser(firebaseUser);

//             // Step 5: Handle remember me
//             if (data.rememberMe) {
//                 localStorage.setItem('rememberedEmail', data.email);
//                 localStorage.setItem('authProvider', 'firebase');
//                 localStorage.setItem('userEmail', data.email);
//             } else {
//                 localStorage.removeItem('rememberedEmail');
//                 localStorage.removeItem('authProvider');
//                 localStorage.removeItem('userEmail');
//             }

//             setLoginSuccess(true);

//             // Step 6: Redirect user
//             setTimeout(() => {
//                 navigate(from, { replace: true });
//             }, 1500);

//         } catch (error) {
//             console.error('Firebase login error:', error);

//             let errorMessage = 'Login failed. Please try again.';

//             // Handle specific Firebase errors
//             if (error.code === 'auth/user-not-found') {
//                 errorMessage = 'No user found with this email. Please register first.';
//             } else if (error.code === 'auth/wrong-password') {
//                 errorMessage = 'Incorrect password. Please try again.';
//             } else if (error.code === 'auth/invalid-email') {
//                 errorMessage = 'Invalid email address format.';
//             } else if (error.code === 'auth/user-disabled') {
//                 errorMessage = 'This account has been disabled. Contact support.';
//             } else if (error.code === 'auth/too-many-requests') {
//                 errorMessage = 'Too many failed attempts. Please try again later.';
//             } else if (error.code === 'auth/network-request-failed') {
//                 errorMessage = 'Network error. Please check your internet connection.';
//             } else if (error.code === 'auth/invalid-credential') {
//                 errorMessage = 'Invalid credentials. Please check your email and password.';
//             } else if (error.message) {
//                 errorMessage = error.message;
//             }

//             setLoginError(errorMessage);
//             setIsLoading(false);
//             setLoading(false);
//         }
//     };

//     // OPTION 2: Custom database login (without Firebase)
//     const handleCustomDatabaseLogin = async (data) => {
//         setIsLoading(true);
//         setLoginError('');
//         setLoginSuccess(false);

//         try {
//             // Send login request to your custom backend
//             const response = await axiosPublic.post('/users/login', {
//                 email: data.email,
//                 password: data.password
//             });

//             if (!response.data.success) {
//                 throw new Error(response.data.message || 'Login failed');
//             }

//             // Create user object similar to Firebase structure
//             const user = {
//                 uid: response.data.user._id || `db_${Date.now()}`,
//                 email: response.data.user.email,
//                 displayName: response.data.user.name || response.data.user.email.split('@')[0],
//                 emailVerified: response.data.user.emailVerified || false,
//                 // Add other properties as needed
//                 ...response.data.user
//             };

//             // Update auth context
//             setUser(user);

//             // Handle remember me
//             if (data.rememberMe) {
//                 localStorage.setItem('rememberedEmail', data.email);
//                 localStorage.setItem('authProvider', 'database');
//                 localStorage.setItem('userData', JSON.stringify(user));
//             } else {
//                 localStorage.removeItem('rememberedEmail');
//                 localStorage.removeItem('authProvider');
//                 localStorage.removeItem('userData');
//             }

//             setLoginSuccess(true);

//             // Redirect
//             setTimeout(() => {
//                 navigate(from, { replace: true });
//             }, 1500);

//         } catch (error) {
//             console.error('Custom database login error:', error);

//             let errorMessage = error.message || 'Login failed. Please check your credentials.';

//             if (error.response?.status === 404) {
//                 errorMessage = 'User not found. Please register first.';
//             } else if (error.response?.status === 401) {
//                 errorMessage = 'Invalid email or password.';
//             } else if (error.response?.status === 500) {
//                 errorMessage = 'Server error. Please try again later.';
//             }

//             setLoginError(errorMessage);
//             setIsLoading(false);
//         }
//     };

//     // Main form submission handler
//     const onSubmit = async (data) => {
//         if (useFirebaseAuth) {
//             await handleFirebaseLogin(data);
//         } else {
//             await handleCustomDatabaseLogin(data);
//         }
//     };

//     // Google login handler - FIXED to save user data properly
//     const handleGoogleLogin = async () => {
//         try {
//             setIsLoading(true);
//             setLoginError('');

//             // Step 1: Firebase Google Authentication
//             const result = await googleSignIn();
//             const firebaseUser = result.user;

//             // Step 2: Prepare complete user data for database
//             const userData = {
//                 uid: firebaseUser.uid,
//                 email: firebaseUser.email,
//                 name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
//                 photoURL: firebaseUser.photoURL || null,
//                 phone: '', // Google doesn't provide phone
//                 role: 'user',
//                 status: 'active',
//                 provider: 'google',
//                 loginMethod: 'google', // Track login method
//                 emailVerified: firebaseUser.emailVerified || true, // Google emails are verified
//                 // For Google users, we don't have a password, so we can:
//                 // 1. Leave password empty (not ideal for your requirement)
//                 // 2. Generate a random password (not secure)
//                 // 3. Use a placeholder (recommended)
//                 password: 'google_oauth_user', // Placeholder - backend should handle this specially
//                 googleId: firebaseUser.uid, // Store Google ID
//                 lastLogin: new Date().toISOString()
//             };

//             // Step 3: Save user to database (blocking - wait for it to complete)
//             const saveResult = await saveUserToDatabase(userData);

//             if (!saveResult.success) {
//                 console.warn('Failed to save Google user to database:', saveResult.error);
//                 // Continue login even if database save fails
//             }

//             // Step 4: Update auth context
//             setUser(firebaseUser);

//             // Step 5: Store user data for persistence
//             localStorage.setItem('googleUser', JSON.stringify({
//                 email: firebaseUser.email,
//                 name: firebaseUser.displayName,
//                 uid: firebaseUser.uid,
//                 photoURL: firebaseUser.photoURL,
//                 loginMethod: 'google'
//             }));
//             localStorage.setItem('authProvider', 'firebase-google');
//             localStorage.setItem('userEmail', firebaseUser.email);

//             setLoginSuccess(true);

//             // Step 6: Redirect
//             setTimeout(() => {
//                 navigate(from, { replace: true });
//             }, 1500);

//         } catch (error) {
//             console.error('Google login error:', error);

//             let errorMessage = 'Google login failed. Please try again.';

//             if (error.code === 'auth/popup-closed-by-user') {
//                 errorMessage = 'Login popup was closed. Please try again.';
//             } else if (error.code === 'auth/cancelled-popup-request') {
//                 errorMessage = 'Login was cancelled.';
//             } else if (error.code === 'auth/popup-blocked') {
//                 errorMessage = 'Popup was blocked by browser. Please allow popups.';
//             } else if (error.code === 'auth/network-request-failed') {
//                 errorMessage = 'Network error. Please check your connection.';
//             }

//             setLoginError(errorMessage);
//             setIsLoading(false);
//             setLoading(false);
//         }
//     };

//     // const handleFacebookLogin = () => {
//     //     setLoginError('Facebook login is not implemented yet. Please use Google or email login.');
//     // };

//     // Toggle between Firebase and custom auth
//     const toggleAuthMethod = () => {
//         setUseFirebaseAuth(!useFirebaseAuth);
//         setLoginError('');
//     };

//     // Check for remembered settings on component mount
//     useEffect(() => {
//         const rememberedEmail = localStorage.getItem('rememberedEmail');
//         const authProvider = localStorage.getItem('authProvider');

//         if (rememberedEmail) {
//             setValue('email', rememberedEmail);
//             setValue('rememberMe', true);

//             // Set auth method based on previous login
//             if (authProvider === 'database') {
//                 setUseFirebaseAuth(false);
//             } else {
//                 setUseFirebaseAuth(true);
//             }
//         }
//     }, [setValue]);

//     // Show registration success message if redirected from registration
//     useEffect(() => {
//         if (location.state?.registrationSuccess) {
//             setLoginSuccess(true);
//             setTimeout(() => {
//                 setLoginSuccess(false);
//             }, 5000);
//         }
//     }, [location.state]);

//     return (
//         <div className="md:min-h-screen flex items-center justify-center p-4">
//             <div className="w-full max-w-md">
//                 {/* Return to Home Button */}
//                 <div className="mb-6">
//                     <Link
//                         to="/"
//                         className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
//                     >
//                         <Home size={18} className="group-hover:-translate-x-1 transition-transform" />
//                         <span>Return to Home</span>
//                     </Link>
//                 </div>

//                 {/* Header */}
//                 <div className="text-center mb-6">
//                     <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
//                     <p>Login to your account to continue</p>

//                     {/* Auth Method Toggle */}
//                     {/* <div className="mt-4 flex items-center justify-center space-x-2">
//                         <span className="text-sm text-gray-600">
//                             Using:
//                         </span>
//                         <button
//                             type="button"
//                             onClick={toggleAuthMethod}
//                             disabled={isLoading}
//                             className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors disabled:opacity-50"
//                         >
//                             {useFirebaseAuth ? 'Firebase Auth' : 'Custom Database Auth'}
//                         </button>
//                         <span className="text-xs text-gray-500">
//                             ({useFirebaseAuth ? 'Recommended' : 'For testing'})
//                         </span>
//                     </div> */}
//                 </div>

//                 {/* Success Message */}
//                 {loginSuccess && (
//                     <div className="mb-4 p-3 bg-linear-to-br from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg shadow animate-pulse">
//                         <div className="flex items-center space-x-2 text-green-600">
//                             <CheckCircle size={18} />
//                             <p className="text-sm font-medium">
//                                 {location.state?.registrationSuccess
//                                     ? 'Registration successful! Please login with your credentials.'
//                                     : 'Login successful! Redirecting...'
//                                 }
//                             </p>
//                         </div>
//                     </div>
//                 )}

//                 {/* Login Form */}
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                     {/* Email Input */}
//                     <div>
//                         <div className="relative">
//                             <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
//                                 <Mail size={20} />
//                             </div>
//                             <input
//                                 {...register('email')}
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl shadow-[inset_5px_5px_6px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_5px_5px_10px_#bebebe,inset_-7px_-7px_14px_#ffffff] text-gray-800 placeholder-gray-600 transition-all duration-200"
//                                 disabled={isLoading}
//                             />
//                         </div>
//                         {errors.email && (
//                             <div className="mt-2 flex items-center space-x-2 text-red-500 text-sm font-medium">
//                                 <AlertCircle size={16} />
//                                 <span>{errors.email.message}</span>
//                             </div>
//                         )}
//                     </div>

//                     {/* Password Input */}
//                     <div>
//                         <div className="relative">
//                             <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
//                                 <Lock size={20} />
//                             </div>
//                             <input
//                                 {...register('password')}
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Enter your password"
//                                 className="w-full pl-12 pr-12 py-3 border border-gray-300 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl shadow-[inset_5px_5px_6px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:shadow-[inset_5px_5px_10px_#bebebe,inset_-7px_-7px_14px_#ffffff] text-gray-800 placeholder-gray-600 transition-all duration-200"
//                                 disabled={isLoading}
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-700 transition-colors disabled:opacity-50"
//                                 disabled={isLoading}
//                             >
//                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                             </button>
//                         </div>

//                         {/* Password Strength Indicator */}
//                         {passwordValue && passwordValue.length > 0 && (
//                             <div className="mt-2 space-y-2">
//                                 <div className="flex items-center justify-between">
//                                     <span className={`text-xs font-medium ${passwordStrength.score >= 4 ? 'text-green-600' :
//                                         passwordStrength.score >= 3 ? 'text-yellow-600' :
//                                             'text-red-600'
//                                         }`}>
//                                         {passwordStrength.message}
//                                     </span>
//                                     {passwordStrength.score >= 4 && !errors.password && (
//                                         <CheckCircle size={16} className="text-green-600" />
//                                     )}
//                                 </div>
//                                 <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
//                                     <div
//                                         className={`h-full transition-all duration-300 ${passwordStrength.score >= 4 ? 'w-full bg-green-500' :
//                                             passwordStrength.score >= 3 ? 'w-3/4 bg-yellow-500' :
//                                                 'w-1/2 bg-red-500'
//                                             }`}
//                                     />
//                                 </div>
//                             </div>
//                         )}

//                         {errors.password && (
//                             <div className="mt-2 flex items-center space-x-2 text-red-500 text-sm font-medium">
//                                 <AlertCircle size={16} />
//                                 <span>{errors.password.message}</span>
//                             </div>
//                         )}
//                     </div>

//                     {/* Remember Me & Forgot Password */}
//                     <div className="flex items-center justify-between">
//                         <label className="flex items-center space-x-3 cursor-pointer group">
//                             <div className="relative">
//                                 <input
//                                     {...register('rememberMe')}
//                                     type="checkbox"
//                                     className="sr-only peer"
//                                     disabled={isLoading}
//                                 />
//                                 <div className={`w-5 h-5 bg-linear-to-br from-gray-100 to-gray-200 rounded shadow-[inset_2px_2px_4px_#bebebe,inset_2px_2px_4px_#bebebe] group-hover:shadow-[inset_1px_1px_2px_#bebebe,inset_-1px_-1px_2px_#ffffff] transition-all duration-200 peer-checked:shadow-[inset_3px_3px_6px_#60a5fa,inset_-3px_-3px_6px_#93c5fd] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
//                                 <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
//                                     <div className="w-3 h-3 bg-blue-500 rounded"></div>
//                                 </div>
//                             </div>
//                             <span className={isLoading ? 'opacity-50' : ''}>Remember me</span>
//                         </label>
//                         <Link
//                             to="/auth/forgot-password"
//                             state={{ email: emailValue }}
//                             className={`text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
//                         >
//                             Forgot password?
//                         </Link>
//                     </div>

//                     {/* Error Message */}
//                     {loginError && (
//                         <div className="p-3 bg-linear-to-br from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg shadow">
//                             <div className="flex items-center space-x-2 text-red-500">
//                                 <AlertCircle size={18} />
//                                 <p className="text-sm font-medium">{loginError}</p>
//                             </div>
//                         </div>
//                     )}

//                     {/* Auth Method Info */}
//                     {/* <div className="p-3 bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg">
//                         <p className="text-xs text-gray-600 text-center">
//                             {useFirebaseAuth
//                                 ? '🔐 Using Firebase Authentication with database sync'
//                                 : '🗄️ Using custom database authentication with bcrypt hashing'
//                             }
//                         </p>
//                     </div> */}

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         disabled={isLoading || !isValid}
//                         className="w-full py-3 bg-linear-to-br from-blue-700 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg active:shadow-[inset_5px_5px_10px_#2563eb,inset_-5px_-5px_10px_#3b82f6] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
//                     >
//                         {isLoading ? (
//                             <span className="flex items-center justify-center">
//                                 <Loader2 className="animate-spin mr-2" size={20} />
//                                 {useFirebaseAuth ? 'Signing in...' : 'Signing in...'}
//                             </span>
//                         ) : (
//                             <span className="flex items-center justify-center">
//                                 {useFirebaseAuth ? 'Login now' : 'Login now'}
//                                 {/* {useFirebaseAuth ? 'Login with Firebase' : 'Login with Database'} */}
//                                 {isValid && (
//                                     <CheckCircle className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
//                                 )}
//                             </span>
//                         )}
//                     </button>

//                     {/* Divider - Only show for Firebase method */}
//                     {useFirebaseAuth && (
//                         <>
//                             <div className="flex items-center">
//                                 <div className="grow h-px bg-gray-400"></div>
//                                 <span className="mx-3 text-sm whitespace-nowrap">
//                                     Or continue with
//                                 </span>
//                                 <div className="grow h-px bg-gray-400"></div>
//                             </div>

//                             {/* Social Login Buttons - Only for Firebase */}
//                             <div className="grid grid-cols-1 gap-4">
//                                 {/* Google Login Button */}
//                                 <button
//                                     type="button"
//                                     onClick={handleGoogleLogin}
//                                     disabled={isLoading}
//                                     className="py-3 bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow hover:shadow-md active:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
//                                 >
//                                     <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
//                                         <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                                         <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                                         <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                                         <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                                     </svg>
//                                     <span className="font-medium">Google</span>
//                                 </button>

//                                 {/* Facebook Login Button */}
//                                 {/* <button
//                                     type="button"
//                                     onClick={handleFacebookLogin}
//                                     disabled={isLoading}
//                                     className="py-3 bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow hover:shadow-md active:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
//                                 >
//                                     <Facebook className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" />
//                                     <span className="font-medium">Facebook</span>
//                                 </button> */}
//                             </div>
//                         </>
//                     )}

//                     {/* Sign Up Link */}
//                     <div className="text-center">
//                         <p className={isLoading ? 'opacity-50' : ''}>
//                             Don't have an account?{' '}
//                             <Link
//                                 to="/auth/register"
//                                 className={`font-medium transition-colors ${isLoading ? "pointer-events-none opacity-50" : "text-blue-500 hover:text-blue-600"}`}
//                             >
//                                 Register
//                             </Link>
//                         </p>
//                     </div>
//                 </form>

//                 {/* Form Validation Status */}
//                 {isDirty && (
//                     <div className="mt-6 p-3 bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow">
//                         <div className="flex items-center justify-between text-sm">
//                             <span>Form Status:</span>
//                             <span className={`font-medium ${isValid ? 'text-green-600' : 'text-yellow-600'}`}>
//                                 {isValid ? 'Ready to submit ✓' : 'Please fix errors'}
//                             </span>
//                         </div>
//                     </div>
//                 )}

//                 {/* Security Note */}
//                 {/* <div className="mt-6 p-3 bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg shadow">
//                     <p className="text-xs text-blue-700 text-center">
//                         {useFirebaseAuth
//                             ? '✅ All user data (email/password/Google) is stored in database'
//                             : '✅ Passwords are bcrypt hashed in database'
//                         }
//                     </p>
//                 </div> */}
//             </div>
//         </div>
//     );
// };

// export default Login;