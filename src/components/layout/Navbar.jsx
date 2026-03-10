import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import useAuth from '../../hooks/useAuth';
import ProfileSection from '../common/ProfileSection';
import LogoutButton from '../common/LogoutButton';
import GetUserInitials from '../../utils/GetUserInitials';
import Tooltip from '../../utils/Tooltip';

const Navbar = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
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

    return (
        <>
            {/* Navbar - Fixed to top */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e0e5ec] shadow-[5px_5px_6px_#babecc,-5px_-5px_5px_#ffffff] px-4 py-2.5">
                <div className="flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center space-x-4">
                        <Tooltip
                            text="Menu"
                            position="bottom"
                        >
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200 cursor-pointer"
                            >
                                <Menu size={22} />
                            </button>
                        </Tooltip>

                        <div className="flex items-center space-x-3">
                            <div className="w-11 h-10 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                <span className="text-blue-600 font-bold">LEO</span>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Conditional rendering based on auth state */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            // After login - Logged in state
                            <>
                                {/* Bell Icon */}
                                <Tooltip
                                    text="Notification"
                                    position="bottom"
                                >

                                    <button className="relative p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200 cursor-pointer">
                                        <Bell size={20} />
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            3
                                        </span>
                                    </button>
                                </Tooltip>

                                {/* Mobile Profile and Logout */}
                                {!isSidebarOpen && (
                                    <div className="flex items-center gap-4">
                                        {/* Profile Avatar */}
                                        <Tooltip
                                            text={user?.name}
                                            position="bottom"
                                        >
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center cursor-default">
                                                    <span className="font-semibold">
                                                        <GetUserInitials />
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                                            </div>
                                        </Tooltip>

                                        {/* Logout Button */}
                                        <Tooltip
                                            text="Logout"
                                            position="bottom"
                                        >
                                            <LogoutButton
                                                variant="icon"
                                                showIcon={true}
                                                showText={false}
                                            />
                                        </Tooltip>

                                        {/* <div className="tooltip-container">
                                            <LogoutButton
                                                variant="icon"
                                                showIcon={true}
                                                showText={false}
                                            />
                                            <span className="tooltip-text">Logout</span>
                                        </div>

                                        {/* <div className="relative group">
                                            <LogoutButton
                                                variant="icon"
                                                showIcon={true}
                                                showText={false}
                                            />

                                            <span className="absolute top-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                                                Logout
                                            </span>
                                        </div> */}
                                    </div>
                                )}
                            </>
                        ) : (
                            // Before login - Only show Login button when sidebar is closed
                            !isSidebarOpen && (
                                <Link
                                    to="/auth/login"
                                    className="px-3 py-2 rounded-lg bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200 flex items-center gap-2 text-blue-600 font-semibold"
                                >
                                    <LogIn size={18} />
                                    <span>Login</span>
                                </Link>
                            )
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
                                <span className="text-blue-600 font-semibold">LEO</span>
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
                            <ul className="space-y-2 cursor-pointer">
                                <Sidebar />
                            </ul>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-300">
                        {user ? (
                            // Profile Section in Sidebar
                            <ProfileSection
                                user={user}
                                variant="sidebar"
                                onLogout={closeSidebar}
                            />
                        ) : (
                            // Login button in sidebar
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
