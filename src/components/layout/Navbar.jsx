import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, User, LogIn, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        // Close sidebar when pressing Escape key
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
            // Prevent body scroll when sidebar is open on mobile
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isSidebarOpen]);

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logOut();
            // Close sidebar after successful logout
            closeSidebar();
            toast.success("User signed out successfully", {
                position: "top-right",
            });
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Format role for display (capitalize first letter)
    // const formatRole = (role) => {
    //     if (!role) return '';
    //     return role.charAt(0).toUpperCase() + role.slice(1);
    // };

    return (
        <>
            {/* Navbar - Fixed to top */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e0e5ec] shadow-[5px_5px_6px_#babecc,-5px_-5px_5px_#ffffff] px-4 py-2.5">
                <div className="flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200"
                        >
                            <Menu size={22} />
                        </button>

                        <div className="flex items-center space-x-3">
                            <div className="w-11 h-10 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-lg">LEO</span>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Conditional rendering based on auth state */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            // After login - Logged in state
                            <>
                                {/* Bell */}
                                <button className="relative p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200">
                                    <Bell size={20} />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        3
                                    </span>
                                </button>

                                {/* Profile */}
                                <div className="flex items-center space-x-3 cursor-default">
                                    <div className="relative">
                                        {user.photoURL ? (
                                            <img
                                                src={user?.photoURL}
                                                alt={user?.name || 'User'}
                                                referrerPolicy="no-referrer"
                                                className="w-10 h-10 rounded-full object-cover shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff]"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                                <User size={20} />
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                                    </div>

                                    <div className="hidden md:block ext-right">
                                        <p className="font-semibold truncate max-w-[150px]">
                                            {user?.name || user?.displayName || 'User'}
                                        </p>
                                        {/* <p className="text-sm">
                                            {formatRole(user.role)}
                                            {user.email && (
                                                <span className="block text-xs text-gray-600 truncate max-w-[180px]">
                                                    {user.email}
                                                </span>
                                            )}
                                        </p> */}
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Before login - Not logged in state
                            <Link
                                to="/auth/login"
                                className="px-4 py-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200 flex items-center gap-2 text-blue-600 font-medium"
                            >
                                <LogIn size={18} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#e0e5ec] transform transition-transform md:duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 shadow-[6px_6px_8px_#babecc,-2px_-2px_2px_#ffffff]' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="px-5 py-2">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-11 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-xl">LEO</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">MediCare</h1>
                                <p className="text-sm">Doctors Care</p>
                            </div>
                        </div>
                    </div>
                    <div className='border-b-2 border-gray-300 drop-shadow'></div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div onClick={closeSidebar}>
                            <ul className="space-y-3 cursor-pointer">
                                <Sidebar />
                            </ul>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-300">
                        {user ? (
                            // After login - User info and logout button in sidebar
                            <>
                                {/* Logout button */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner text-red-500 font-medium transition duration-200 flex items-center gap-3 cursor-pointer"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            // Before login - Login button in sidebar
                            <Link
                                to="/auth/login"
                                onClick={closeSidebar}
                                className="w-full text-left px-4 py-3 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner text-blue-600 font-medium transition duration-200 flex items-center gap-3 cursor-pointer"
                            >
                                <User size={18} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-xs z-40"
                    onClick={closeSidebar}
                />
            )}
        </>
    );
};

export default Navbar;
