import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

export const useSettingsData = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [emailNotifications, setEmailNotifications] = useState({
        newsletter: false,
        updates: false,
        promotions: false,
        reminders: true
    });

    // Fetch user data
    const { data: userData, isLoading: isLoadingUser } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/email/${user?.email}`);
            return response.data;
        },
        enabled: !!user?.email
    });

    // Update email notifications when user data loads
    useEffect(() => {
        if (userData) {
            setEmailNotifications(prev => ({
                ...prev,
                newsletter: userData.newsletter || false
            }));
        }
    }, [userData]);

    // Update profile mutation
    const updateProfileMutation = useMutation({
        mutationFn: async (data) => {
            const response = await axiosSecure.patch(`/users/email/${user?.email}`, data);
            return response.data;
        },
        onSuccess: () => {
            toast.success('Profile updated successfully!');
            queryClient.invalidateQueries(['user', user?.email]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    });

    // Change password mutation
    const changePasswordMutation = useMutation({
        mutationFn: async (data) => {
            const response = await axiosSecure.post('/users/change-password', {
                email: user?.email,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Password changed successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to change password');
        }
    });

    // Update email notifications mutation
    const updateNotificationsMutation = useMutation({
        mutationFn: async (data) => {
            const response = await axiosSecure.patch(`/users/email/${user?.email}`, {
                newsletter: data.newsletter
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Notification preferences updated!');
            queryClient.invalidateQueries(['user', user?.email]);
        }
    });

    // Delete account mutation
    const deleteAccountMutation = useMutation({
        mutationFn: async () => {
            const userResponse = await axiosSecure.get(`/users/email/${user?.email}`);
            const response = await axiosSecure.delete(`/users/${userResponse.data._id}`);
            return response.data;
        },
        onSuccess: async () => {
            toast.success('Account deleted successfully');
            await logOut();
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete account');
        }
    });

    const handleNotificationToggle = (key) => {
        const newValue = !emailNotifications[key];
        setEmailNotifications(prev => ({ ...prev, [key]: newValue }));

        if (key === 'newsletter') {
            updateNotificationsMutation.mutate({ newsletter: newValue });
        }
    };

    return {
        user,
        userData,
        isLoadingUser,
        emailNotifications,
        updateProfileMutation,
        changePasswordMutation,
        updateNotificationsMutation,
        deleteAccountMutation,
        handleNotificationToggle,
        queryClient
    };
};
