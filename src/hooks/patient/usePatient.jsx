import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";

const usePatient = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isPatient = false, isPending: isPatientLoading } = useQuery({
        queryKey: [user?.email, 'isPatient'],
        // Only run if user exists and not loading
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/normal-user/${user.email}`);
                return res.data?.normalUsers || false;
            } catch (error) {
                console.error('Error checking patient status:', error);
                return false;
            }
        },
        // Cache the result for 5 minutes to reduce API calls
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Return false by default if query fails
        placeholderData: false,
    });

    // Return as array for backward compatibility
    return [isPatient, isPatientLoading];
};

export default usePatient;
