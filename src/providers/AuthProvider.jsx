import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(null);
    const axiosPublic = useAxiosPublic();

    // Check for stored token on initial load
    useEffect(() => {
        const initializeAuth = () => {
            const storedAccessToken = localStorage.getItem('access_token');

            if (storedAccessToken) {
                try {
                    const decoded = jwtDecode(storedAccessToken);

                    if (decoded.exp * 1000 > Date.now()) {
                        setAccessToken(storedAccessToken);
                        setUser({
                            _id: decoded.id || decoded._id || decoded.sub,
                            id: decoded.id || decoded._id || decoded.sub,
                            email: decoded.email,
                            name: decoded.name,
                            role: decoded.role || 'user',
                        });
                    } else {
                        // console.log('Access token expired');
                        localStorage.removeItem('access_token');
                        // Don't remove rememberedEmail
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    localStorage.removeItem('access_token');
                    // Don't remove rememberedEmail
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    // User log out - FIXED: don't remove rememberedEmail
    const logOut = () => {
        setLoading(true);
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        // ✅ REMOVED: localStorage.removeItem('rememberedEmail');
        setLoading(false);
        return Promise.resolve();
    }

    // Refresh token function
    const refreshAccessToken = async () => {
        try {
            const response = await axiosPublic.post('/users/refresh-token', {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
                setAccessToken(response.data.access_token);

                const decoded = jwtDecode(response.data.access_token);
                setUser({
                    _id: decoded.id || decoded._id || decoded.sub,
                    id: decoded.id || decoded._id || decoded.sub,
                    email: decoded.email,
                    name: decoded.name,
                    role: decoded.role,
                });
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            logOut();
        }
    };

    const authInfo = {
        user,
        loading,
        accessToken,
        setUser,
        setAccessToken,
        logOut,
        refreshAccessToken,
        setLoading,
        isAuthenticated: !!user && !!accessToken
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;







// User with Firebase
// import { createContext, useEffect, useState } from "react";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import auth from "../firebase/firebase.config";

// export const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const axiosPublic = useAxiosPublic();

//     // Create user
//     const createUser = (email, password) => {
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password);
//     }

//     // Sign in or Login user
//     const signIn = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password);
//     }

//     // Google Sign up
//     const googleProvider = new GoogleAuthProvider();
//     const googleSignIn = () => {
//         setLoading(true);
//         return signInWithPopup(auth, googleProvider);
//     }

//     // User log out
//     const logOut = () => {
//         setLoading(true);
//         return signOut(auth);
//     }

//     // User profile updated
//     const updateUserProfile = (updatedData) => {
//         return updateProfile(auth.currentUser, updatedData);
//     }

//     // Auth
//     useEffect(() => {
//         const unSubscribe = onAuthStateChanged(auth, currentUser => {
//             setUser(currentUser);
//             setLoading(false);
//         });
//         return () => {
//             unSubscribe();
//         }
//     }, []);

//     const authInfo = {
//         user,
//         loading,
//         setUser,
//         createUser,
//         signIn,
//         googleSignIn,
//         logOut,
//         updateUserProfile,
//         setLoading,
//     }
//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;