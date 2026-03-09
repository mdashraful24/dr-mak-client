import { BarChart3, Calendar, Clock, FileText, HelpCircle, Home, Hospital, LayoutDashboard, Pill, Settings, SettingsIcon, Stethoscope, User, Users } from 'lucide-react';
import { NavLink } from "react-router";
import useAuth from '../../hooks/useAuth';
import ProfileSection from '../common/ProfileSection';
import ProfileDropdown from '../common/ProfileDropdown';
import CompactProfileTrigger from '../common/CompactProfileTrigger';
import Tooltip from '../../utils/Tooltip';

const DashboardSidebar = ({
    isSidebarCollapsed,
    isSidebarOpen,
    toggleSidebar,
    onMenuItemClick
}) => {
    const { user } = useAuth();

    // Dashboard menu items for users
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

    // Dropdown menu items for profile
    const dropMenuItems = [
        { path: "/profile", label: "View Profile", icon: User },
        { path: "/settings", label: "Settings", icon: SettingsIcon },
        { path: "/help", label: "Help", icon: HelpCircle },
    ];

    const handleItemClick = () => {
        if (onMenuItemClick) {
            onMenuItemClick();
        }
    };

    return (
        <>
            {/* Sidebar */}
            <div className={`
                fixed md:relative bg-[#e0e5ec] shadow-[5px_0_15px_#babecc,-2px_0_5px_#ffffff] h-full flex flex-col transition-all duration-300 ease-in-out z-40
                ${isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full"} 
                ${!isSidebarOpen && "md:translate-x-0 md:flex"} 
                ${isSidebarCollapsed ? "md:w-16 lg:w-18" : "w-64"} 
            `}>
                {/* Navigation Menu */}
                <div className="flex-1 overflow-y-auto p-3 lg:p-4 relative">
                    <ul className="space-y-3">
                        {dashboardMenuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative ${isSidebarCollapsed ? 'justify-center' : ''
                                            } ${isActive
                                                ? 'bg-[#e0e5ec] font-semibold text-blue-700 shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]'
                                                : 'bg-[#e0e5ec] hover:shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]'
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
                                        {/* Tooltip for collapsed state */}
                                        {isSidebarCollapsed && !isSidebarOpen && (
                                            <div className="fixed left-18 px-2 py-1 bg-black text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
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
                <div className="mb-15 md:mb-0 shrink-0 p-3 lg:p-4 border-t border-gray-300 mt-auto relative">
                    {isSidebarCollapsed ? (
                        <ProfileDropdown
                            user={user}
                            triggerComponent={
                                <Tooltip
                                    text="Profile"
                                    position="right"
                                >
                                    <CompactProfileTrigger />
                                </Tooltip>
                            }
                            menuItems={dropMenuItems}
                            position="bottom-left"
                            onLinkClick={handleItemClick}
                            showUserInfo={true}
                        />
                    ) : (
                        <ProfileSection
                            user={user}
                            variant="sidebar"
                            onLogout={handleItemClick}
                        />
                    )}
                </div>
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









// // Inside Dropdown
// import { useState, useRef, useEffect } from 'react';
// import { BarChart3, Calendar, Clock, FileText, Home, Hospital, LayoutDashboard, Pill, Settings, Stethoscope, Users, X, LogOut, User, Settings as SettingsIcon, HelpCircle, ChevronRight } from 'lucide-react';
// import { NavLink } from "react-router";
// import useAuth from '../../hooks/useAuth';
// import ProfileSection from '../common/ProfileSection';
// import GetUserInitials from '../../utils/GetUserInitials';
// import LogoutButton from '../common/LogoutButton';

// const DashboardSidebar = ({
//     isSidebarCollapsed,
//     isSidebarOpen,
//     toggleSidebar,
//     onMenuItemClick
// }) => {
//     const { user } = useAuth();
//     const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const dashboardMenuItems = [
//         { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//         { path: "/dashboard/patients", label: "Patients", icon: Users },
//         { path: "/dashboard/appointments", label: "Appointments", icon: Calendar },
//         { path: "/dashboard/prescriptions", label: "Prescriptions", icon: Pill },
//         { path: "/dashboard/medical-records", label: "Medical Records", icon: FileText },
//         { path: "/dashboard/reports", label: "Reports", icon: BarChart3 },
//         { path: "/dashboard/doctors", label: "Doctors", icon: Stethoscope },
//         { path: "/dashboard/departments", label: "Departments", icon: Hospital },
//         { path: "/dashboard/schedule", label: "Schedule", icon: Clock },
//         { path: "/dashboard/settings", label: "Settings", icon: Settings },
//         { path: "/", label: "Home", icon: Home },
//     ];

//     const handleItemClick = () => {
//         if (onMenuItemClick) {
//             onMenuItemClick();
//         }
//     };

//     const handleProfileClick = () => {
//         setIsProfileDropdownOpen(!isProfileDropdownOpen);
//     };

//     const handleCloseDropdown = () => {
//         setIsProfileDropdownOpen(false);
//     };

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsProfileDropdownOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Mock user data for demo (replace with actual user from useAuth)
//     const mockUser = user || {
//         name: "Dr. Leo",
//         email: "leo@example.com",
//         role: "Neurologist & Surgeon",
//         department: "Neurology",
//         joinDate: "2020",
//         displayName: "Dr. Leo"
//     };

//     return (
//         <>
//             {/* Sidebar */}
//             <div className={`
//                 fixed md:relative bg-[#e0e5ec] shadow-[5px_0_15px_#babecc,-2px_0_5px_#ffffff] h-full flex flex-col transition-all duration-300 ease-in-out z-40
//                 ${isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full"}
//                 ${!isSidebarOpen && "md:translate-x-0 md:flex"}
//                 ${isSidebarCollapsed ? "md:w-16 lg:w-18" : "w-64"}
//             `}>
//                 {/* Navigation Menu */}
//                 <div className="flex-1 overflow-y-auto p-3 lg:p-4 relative">
//                     <ul className="space-y-3">
//                         {dashboardMenuItems.map((item) => {
//                             const IconComponent = item.icon;
//                             return (
//                                 <li key={item.path}>
//                                     <NavLink
//                                         to={item.path}
//                                         className={({ isActive }) =>
//                                             `flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative ${isSidebarCollapsed ? 'justify-center' : ''
//                                             } ${isActive
//                                                 ? 'bg-[#e0e5ec] font-semibold text-blue-700 shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]'
//                                                 : 'bg-[#e0e5ec] hover:shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]'
//                                             }`
//                                         }
//                                         end={item.path === "/dashboard"}
//                                         onClick={handleItemClick}
//                                     >
//                                         <IconComponent size={22} className="min-w-5" />
//                                         {/* Show text only when sidebar is not collapsed OR when sidebar is open on mobile */}
//                                         {(!isSidebarCollapsed || isSidebarOpen) && (
//                                             <span className={`transition-opacity duration-200 ${isSidebarCollapsed && !isSidebarOpen ? 'lg:hidden' : ''
//                                                 }`}>
//                                                 {item.label}
//                                             </span>
//                                         )}
//                                         {/* Tooltip for collapsed state */}
//                                         {isSidebarCollapsed && !isSidebarOpen && (
//                                             <div className="fixed left-16 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
//                                                 {item.label}
//                                             </div>
//                                         )}
//                                     </NavLink>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 </div>

//                 {/* Sidebar Footer - Clickable when collapsed */}
//                 <div className="mb-15 md:mb-0 shrink-0 p-3 lg:p-4 border-t border-gray-300 mt-auto relative" ref={dropdownRef}>
//                     {isSidebarCollapsed ? (
//                         <>
//                             <button
//                                 onClick={handleProfileClick}
//                                 className="w-full flex justify-center focus:outline-none"
//                             >
//                                 <div className="relative group">
//                                     <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center group-hover:shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] transition-all duration-200">
//                                         <span className="font-semibold">
//                                             <GetUserInitials />
//                                         </span>
//                                     </div>
//                                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
//                                 </div>
//                             </button>

//                             {/* Dropdown Menu */}
//                             {isProfileDropdownOpen && (
//                                 <div className="absolute bottom-16 left-2 mb-2 w-64 bg-[#e0e5ec] rounded-xl shadow-[2px_2px_5px_#babecc,-2px_-2px_5px_#babecc] overflow-hidden animate-slideUp">
//                                     {/* User Info Header */}
//                                     <div className="p-4 border-b border-gray-300">
//                                         <div className="flex items-center gap-3">
//                                             <div className="relative">
//                                                 <div className="w-16 h-16 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
//                                                     <span className="font-bold text-xl">
//                                                         <GetUserInitials />
//                                                     </span>
//                                                 </div>
//                                                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-[#e0e5ec]" />
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-bold">{mockUser.name}</h3>
//                                                 <p className="text-gray-600">{mockUser.email}</p>
//                                                 <span className="inline-block px-2 py-0.5 text-sm text-gray-600 bg-[#e0e5ec] rounded-full shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff]">
//                                                     {mockUser.role}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Dropdown Items */}
//                                     <div className="p-2">
//                                         <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#e0e5ec] hover:shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 text-left">
//                                             <User size={18} />
//                                             <span className="flex-1">View Profile</span>
//                                             <ChevronRight size={16} className="text-gray-500" />
//                                         </button>

//                                         <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#e0e5ec] hover:shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 text-left">
//                                             <SettingsIcon size={18} />
//                                             <span className="flex-1">Settings</span>
//                                             <ChevronRight size={16} className="text-gray-500" />
//                                         </button>

//                                         <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#e0e5ec] hover:shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 text-left">
//                                             <HelpCircle size={18} />
//                                             <span className="flex-1">Help</span>
//                                             <ChevronRight size={16} className="text-gray-500" />
//                                         </button>

//                                         <div className="border-t border-gray-300 my-2" />

//                                         <LogoutButton
//                                             variant="profileDropdown"
//                                         />
//                                     </div>
//                                 </div>
//                             )}
//                         </>
//                     ) : (
//                         <ProfileSection
//                             user={mockUser}
//                             variant="sidebar"
//                             onLogout={handleItemClick}
//                         />
//                     )}
//                 </div>
//             </div>

//             {/* Overlay for mobile */}
//             {isSidebarOpen && (
//                 <div
//                     className="fixed inset-0 z-30 md:hidden"
//                     onClick={toggleSidebar}
//                 />
//             )}
//         </>
//     );
// };

// export default DashboardSidebar;