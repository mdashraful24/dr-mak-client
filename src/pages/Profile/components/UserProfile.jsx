import { useQuery } from '@tanstack/react-query';
import { Mail, Phone, Calendar, User, Shield, Clock, XCircle } from 'lucide-react';
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";

const UserProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: profileData, isLoading, error, refetch } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            const response = await axiosSecure.get(`/users/email/${user.email}`);
            return response.data;
        },
        enabled: !!user?.email,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // Neumorphic style classes
    const neumorphCard = "rounded-2xl shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#d1d9e6]";
    const neumorphInset = "rounded-xl shadow-[inset_3px_3px_5px_#d1d9e6,inset_-3px_-3px_5px_#ffffff]";
    const neumorphIcon = "rounded-xl shadow-head-badge p-3";

    // Skeleton Loader Component
    const SkeletonItem = () => (
        <div className={neumorphInset}>
            <div className="p-4">
                <div className="flex items-center space-x-3">
                    <div className={`${neumorphIcon} bg-gray-200 animate-pulse`}>
                        <div className="w-5 h-5"></div>
                    </div>
                    <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const SkeletonRole = () => (
        <div className={`${neumorphInset} px-4 py-2 flex items-center space-x-2`}>
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
    );

    // Format date function with safe handling
    const formatDateFns = (dateString, formatString) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), formatString);
        } catch (error) {
            return 'Invalid Date';
        }
    };

    // Error state
    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className={`${neumorphCard} p-8 text-center`}>
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Error Loading Profile</h2>
                    <p className="text-gray-600 mb-6">{error.message || 'Failed to load profile data'}</p>
                    <button
                        onClick={() => refetch()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto md:pt-8">
            {/* Profile Card */}
            <div className={neumorphCard}>
                <div className="rounded-2xl p-6 md:p-8">
                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center gap-4">
                        {isLoading ? (
                            <>
                                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                                <SkeletonRole />
                            </>
                        ) : (
                            <>
                                {/* Profile Image/Avatar */}
                                <div className={`${neumorphIcon} p-4`}>
                                    <User className=" md:w-12 md:h-12" />
                                </div>

                                <h1 className="text-3xl font-bold text-gray-800">
                                    {profileData?.name || user?.displayName || 'User'}
                                </h1>

                                <div className={`${neumorphInset} px-4 py-2 flex items-center space-x-2`}>
                                    <Shield className={`w-4 h-4 ${profileData?.role === 'admin' ? 'text-purple-600' : 'text-blue-600'
                                        }`} />
                                    <span className="text-sm font-medium capitalize text-gray-700">
                                        {profileData?.role || 'User'}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* User Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {/* Email */}
                        {isLoading ? (
                            <SkeletonItem />
                        ) : (
                            <div className={neumorphInset}>
                                <div className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className={neumorphIcon}>
                                            <Mail className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email Address</p>
                                            <p className="font-semibold">{profileData?.email || user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Phone */}
                        {isLoading ? (
                            <SkeletonItem />
                        ) : (
                            <div className={neumorphInset}>
                                <div className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className={neumorphIcon}>
                                            <Phone className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Phone Number</p>
                                            <p className="font-semibold">{profileData?.phone || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Member Since */}
                        {isLoading ? (
                            <SkeletonItem />
                        ) : (
                            <div className={neumorphInset}>
                                <div className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className={neumorphIcon}>
                                            <Calendar className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Member Since</p>
                                            <p className="font-semibold">
                                                {profileData?.createdAt
                                                    ? formatDateFns(profileData.createdAt, "MMMM do, yyyy 'at' h:mm a")
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Last Login */}
                        {isLoading ? (
                            <SkeletonItem />
                        ) : (
                            <div className={neumorphInset}>
                                <div className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className={neumorphIcon}>
                                            <Clock className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Last Login</p>
                                            <p className="font-semibold">
                                                {profileData?.lastLogin
                                                    ? formatDateFns(profileData.lastLogin, "MMMM do, yyyy 'at' h:mm a")
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Newsletter Preference */}
                    {!isLoading && profileData?.newsletter !== undefined && (
                        <div className={`${neumorphInset} mt-6`}>
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={neumorphIcon}>
                                            <Mail className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Newsletter Subscription</p>
                                            <p className="text-sm text-gray-600">
                                                {profileData.newsletter
                                                    ? 'You are subscribed to our newsletter'
                                                    : 'You are not subscribed to our newsletter'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`${neumorphInset} px-3 py-1`}>
                                        <span className={`text-sm font-medium
                                                ${profileData.newsletter ? 'text-green-600' : 'text-gray-600'}`}>
                                            {profileData.newsletter ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
