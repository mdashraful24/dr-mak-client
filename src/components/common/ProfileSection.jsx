import LogoutButton from './LogoutButton';
import GetUserInitials from '../../utils/GetUserInitials';

const ProfileSection = ({
    user,
    variant = 'sidebar', // 'sidebar', 'navbar'
    onLogout,
    className = ''
}) => {
    const variants = {
        sidebar: {
            container: "bg-[#e0e5ec] rounded-xl p-3 lg:p-4 shadow-[3px_3px_8px_#babecc,-3px_-3px_8px_#ffffff]",
            profile: "flex items-center gap-3 mb-3",
            avatar: "w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center",
            name: "font-semibold text-sm truncate",
            email: "text-xs truncate text-gray-600"
        },
        navbar: {
            container: "flex items-center gap-3",
            profile: "flex items-center gap-3",
            avatar: "w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center",
            name: "font-semibold truncate max-w-[150px]",
            email: "text-xs text-gray-600 truncate max-w-[180px]"
        }
    };

    const styles = variants[variant];

    // // Get user initials for avatar
    // const getUserInitials = () => {
    //     if (user?.displayName) {
    //         return user.displayName
    //             .split(' ')
    //             .map(word => word[0])
    //             .join('')
    //             .toUpperCase()
    //             .slice(0, 2);
    //     }
    //     return user?.email?.charAt(0).toUpperCase() || 'U';
    // };

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.profile}>
                <div className="relative">
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt={user?.name || 'User'}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff]"
                        />
                    ) : (
                        <div className={styles.avatar}>
                            <span className="font-semibold">
                                <GetUserInitials />
                                {/* {getUserInitials()} */}
                            </span>
                        </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                </div>

                <div className="flex-1 min-w-0">
                    <p className={styles.name}>
                        {user?.name || user?.displayName || 'User'}
                    </p>
                    {variant === 'sidebar' && (
                        <p className={styles.email}>
                            {user?.email || ''}
                        </p>
                    )}
                </div>
            </div>

            <LogoutButton
                variant={variant === 'sidebar' ? 'sidebar' : 'navbar'}
                onLogoutSuccess={onLogout}
                showIcon={true}
                showText={variant === 'sidebar'}
            >
                {variant === 'navbar' ? '' : 'Logout'}
            </LogoutButton>
        </div>
    );
};

export default ProfileSection;
