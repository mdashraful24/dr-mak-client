import { NavLink } from "react-router";
import { Home, Users, Calendar, FileText, BarChart3, Settings, LayoutDashboard, Info, Briefcase, Building, BookOpen, Phone } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { path: "/", label: "Home", icon: Home },
        { path: "/about", label: "About", icon: Info },
        { path: "/about", label: "Services", icon: Briefcase },
        { path: "/about", label: "Departments", icon: Building },
        { path: "/about", label: "Blog", icon: BookOpen },
        { path: "/about", label: "Contact", icon: Phone },
        { path: "/patients", label: "Patients", icon: Users },
        { path: "/appointments", label: "Appointments", icon: Calendar },
        { path: "/prescriptions", label: "Prescriptions", icon: FileText },
        { path: "/reports", label: "Reports", icon: BarChart3 },
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/settings", label: "Settings", icon: Settings },
    ];

    return (
        <>
            {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
                                    ? 'bg-[#e0e5ec] font-semibold shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]'
                                    : 'bg-[#e0e5ec] hover:shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]'
                                }`
                            }
                            end={item.path === "/"}
                        >
                            <IconComponent size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    </li>
                );
            })}
        </>
    );
};

export default Sidebar;