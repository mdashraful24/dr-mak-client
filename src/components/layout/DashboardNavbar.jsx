import { Bell, ChevronRight, ChevronLeft, Menu } from 'lucide-react';
import LogoutButton from '../common/LogoutButton';
import useAuth from '../../hooks/useAuth';
import GetUserInitials from '../../utils/GetUserInitials';

const DashboardNavbar = ({
    isSidebarCollapsed,
    toggleSidebar,
    toggleCollapseSidebar,
    isSidebarOpen
}) => {
    const { user } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e0e5ec] shadow-[5px_5px_6px_#babecc,-5px_-5px_5px_#ffffff] px-3 py-2.5">
            <div className="flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center space-x-5">
                    {/* Desktop Sidebar Toggle Button */}
                    <button
                        onClick={toggleCollapseSidebar}
                        className="hidden md:flex p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200"
                    >
                        {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200 md:hidden"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="w-10 h-10 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">DC</span>
                    </div>
                    <div>
                        <h1 className="hidden md:block text-xl font-bold">Doctor's Dashboard</h1>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button className="relative p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            3
                        </span>
                    </button>

                    {/* Profile and Logout (Conditional Logout Button based on sidebar state) */}
                    {isSidebarCollapsed && (
                        <>
                            <div className="relative">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user?.name || 'User'}
                                        referrerPolicy="no-referrer"
                                        className="w-10 h-10 rounded-full object-cover shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff]"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                        <span className="font-semibold">
                                            <GetUserInitials />
                                        </span>
                                    </div>
                                )}
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                            </div>

                            <LogoutButton
                                variant="icon"
                                className="hidden md:block"
                                showIcon={true}
                                showText={false}
                            />
                        </>
                    )}

                    {!isSidebarOpen && (
                        <LogoutButton
                            variant="icon"
                            className="block md:hidden"
                            showIcon={true}
                            showText={false}
                        />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
