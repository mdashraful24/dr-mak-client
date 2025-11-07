import { BarChart3, Calendar, Clock, FileText, Home, Hospital, LayoutDashboard, LogOut, Pill, Settings, Stethoscope, User, Users } from 'lucide-react';
import { NavLink } from "react-router";

const DashboardSidebar = ({ isSidebarCollapsed, isSidebarOpen, toggleSidebar, onMenuItemClick }) => {
    const dashboardMenuItems = [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/dashboard/patients", label: "Patients", icon: Users },
        { path: "/dashboard/appointments", label: "Appointments", icon: Calendar },
        { path: "/dashboard/prescriptions", label: "Prescriptions", icon: Pill },
        { path: "/dashboard/medical-records", label: "Medical Records", icon: FileText },
        { path: "/dashboard/reports", label: "Reports", icon: BarChart3 },
        { path: "/dashboard/doctors", label: "Doctors", icon: Stethoscope },
        { path: "/dashboard/departments", label: "Departments", icon: Hospital },
        { path: "/dashboard/schedule", label: "Schedule", icon: Clock },
        { path: "/dashboard/settings", label: "Settings", icon: Settings },
        { path: "/", label: "Home", icon: Home },
    ];

    const handleItemClick = () => {
        onMenuItemClick();
    };

    return (
        <>
            {/* Sidebar */}
            <div className={`
                fixed md:relative bg-[#e0e5ec] shadow-[5px_0_15px_#babecc,-2px_0_5px_#ffffff] h-full flex flex-col transition-all duration-300 ease-in-out z-40
                ${isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full"} 
                ${!isSidebarOpen && "md:translate-x-0 md:flex"} 
                ${isSidebarCollapsed ? "md:w-16 lg:w-16" : "w-64"} 
            `}>
                {/* Navigation Menu - Allow scrolling but ensure footer stays visible */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
                    <ul className="space-y-2">
                        {dashboardMenuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative ${isSidebarCollapsed ? 'justify-center' : ''
                                            } ${isActive
                                                ? 'bg-[#e0e5ec] font-semibold text-blue-600 shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]'
                                                : 'bg-[#e0e5ec] hover:shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:text-blue-600'
                                            }`
                                        }
                                        end={item.path === "/dashboard"}
                                        onClick={handleItemClick}
                                    >
                                        <IconComponent size={22} className="min-w-5" />
                                        {/* Show text only when sidebar is not collapsed OR when sidebar is open on mobile */}
                                        {(!isSidebarCollapsed || isSidebarOpen) && (
                                            <span className={`transition-opacity duration-200 ${isSidebarCollapsed && !isSidebarOpen ? 'lg:hidden' : ''
                                                }`}>
                                                {item.label}
                                            </span>
                                        )}
                                        {/* Tooltip for collapsed state - show on medium and large screens when collapsed */}
                                        {isSidebarCollapsed && !isSidebarOpen && (
                                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                                                {item.label}
                                            </div>
                                        )}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Sidebar Footer */}
                {!isSidebarCollapsed &&
                    <div className="mb-15 md:mb-0 shrink-0 p-4 border-t border-gray-300 mt-auto">
                        <div
                            className="bg-[#e0e5ec] rounded-xl p-4 shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]"
                        >
                            {/* Profile Section */}
                            <div
                                className={`flex items-center gap-3 mb-3`}
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                        <User size={20} />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#e0e5ec]" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm truncate">Dr. John Smith</p>
                                    <p className="text-xs truncate">Cardiologist</p>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                className="w-full px-3 py-2 rounded-lg bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner text-red-500 text-sm font-medium transition duration-200 flex items-center gap-3"
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                }
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default DashboardSidebar;
