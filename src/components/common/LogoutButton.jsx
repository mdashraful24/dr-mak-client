import { LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LogoutButton = ({
    variant = 'default', // 'default', 'icon', 'sidebar', 'navbar'
    onLogoutSuccess,
    className = '',
    showIcon = true,
    showText = true,
    children
}) => {
    const { logOut } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success("User signed out successfully", {
                position: "top-right",
            });

            // Call the success callback if provided
            if (onLogoutSuccess) {
                onLogoutSuccess();
            }

            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Style variants
    const variants = {
        default: "px-4 py-2 rounded-lg bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner text-red-500 font-medium transition duration-200 flex items-center gap-3 cursor-pointer",
        icon: "p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner text-red-500 transition duration-200 cursor-pointer",
        navbar: "px-4 py-2 rounded-lg bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner text-red-500 font-medium transition duration-200 flex items-center gap-2 cursor-pointer",
        sidebar: "w-full px-4 py-3 rounded-lg bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner text-red-500 text-sm font-medium transition duration-200 flex items-center gap-3 cursor-pointer",
        profileDropdown: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 text-left cursor-pointer"
    };

    return (
        <button
            onClick={handleLogout}
            className={`${variants[variant]} ${className}`}
        >
            {showIcon && <LogOut size={variant === 'icon' ? 20 : 18} />}
            {showText && (children || "Logout")}
        </button>
    );
};

export default LogoutButton;
