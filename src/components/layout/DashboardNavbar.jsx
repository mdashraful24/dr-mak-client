import { Bell, User, ChevronRight, ChevronLeft, Menu, LogOut } from 'lucide-react';

const DashboardNavbar = ({ isSidebarCollapsed, toggleSidebar, toggleCollapseSidebar, isSidebarOpen }) => {
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
                        {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200 md:hidden"
                    >
                        <Menu />
                    </button>

                    <div className="w-10 h-10 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">DC</span>
                    </div>
                    <div>
                        <h1 className="hidden md:block text-xl font-bold">Doctor's Dashboard</h1>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="relative p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            3
                        </span>
                    </button>

                    {/* Profile */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                <User size={20} />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#e0e5ec]" />
                        </div>

                        {/* Logout */}
                        {isSidebarCollapsed &&
                            <button className="hidden md:block p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner text-red-500 transition duration-200">
                                <LogOut size={20} />
                            </button>
                        }
                        {!isSidebarOpen &&
                            <button className="block md:hidden p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner text-red-500 transition duration-200">
                                <LogOut size={20} />
                            </button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
