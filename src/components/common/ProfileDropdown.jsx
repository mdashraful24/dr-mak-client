import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import GetUserInitials from '../../utils/GetUserInitials';
import LogoutButton from './LogoutButton';

const ProfileDropdown = ({
    user,
    triggerComponent,
    menuItems = [],
    position = 'bottom-left',
    showUserInfo = true,
    onLinkClick
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        if (onLinkClick) {
            onLinkClick();
        }
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Position classes
    const positionClasses = {
        'bottom-left': 'bottom-13.5 left-0',
        'bottom-right': 'bottom-14 right-0',
        'top-left': 'top-14 left-0',
        'top-right': 'top-14 right-0',
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Component */}
            <div onClick={handleToggle} className="cursor-pointer">
                {triggerComponent}
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className={`absolute ${positionClasses[position]} w-64 bg-[#e0e5ec] rounded-xl shadow-[2px_2px_5px_#babecc,-2px_-2px_5px_#babecc] overflow-hidden animate-slideUp z-50`}>
                    {/* User Info Header */}
                    {showUserInfo && (
                        <div className="p-4 border-b border-gray-300">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center">
                                        <span className="font-bold text-xl">
                                            <GetUserInitials />
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-[#e0e5ec]" />
                                </div>
                                <div className='space-y-0.5'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className="font-bold">{user?.displayName || user?.name || 'User'}</h3>
                                        {user?.role && (
                                            <span className="inline-block px-2 py-0.5 text-sm text-gray-600 bg-[#e0e5ec] rounded-full shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff]">
                                                {user.role}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm">{user?.email || 'user@example.com'}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Dropdown Items from menuItems prop */}
                    <div className="p-2">
                        {menuItems.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={index}
                                    to={item.path}
                                    onClick={handleLinkClick}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#e0e5ec] hover:shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] transition-all duration-200 text-left cursor-pointer no-underline text-inherit"
                                >
                                    <IconComponent size={18} />
                                    <span className="flex-1">{item.label}</span>
                                    <ChevronRight size={16} className="text-gray-600" />
                                </Link>
                            );
                        })}

                        <div className="border-t border-gray-300 my-2" />

                        <LogoutButton variant="profileDropdown" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
