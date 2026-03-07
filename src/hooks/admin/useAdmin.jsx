import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin = false, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        // Only run if user exists and not loading
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                return res.data?.admin || false;
            } catch (error) {
                console.error('Error checking admin status:', error);
                return false;
            }
        },
        // Cache the result for 5 minutes to reduce API calls
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Return false by default if query fails
        placeholderData: false,
    });

    // Return as array for backward compatibility
    return [isAdmin, isAdminLoading];
};

export default useAdmin;
