import { Bell } from 'lucide-react';

const NotificationBell = ({
    count = 0,
    onClick,
    className = '',
    iconSize = 20
}) => {
    return (
        <button
            onClick={onClick}
            className={`relative p-2 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff] hover:shadow-inner transition duration-200 cursor-pointer ${className}`}
        >
            <Bell size={iconSize} />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </button>
    );
};

export default NotificationBell;
