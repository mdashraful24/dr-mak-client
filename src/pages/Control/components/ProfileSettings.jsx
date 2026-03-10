import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Loader2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const profileSchema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().nullable().required('Phone number is required')
});

const ProfileSettings = () => {
    const { userData, updateProfileMutation } = useOutletContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: ''
        }
    });

    useEffect(() => {
        if (userData) {
            reset({
                name: userData.name || '',
                email: userData.email || '',
                phone: userData.phone || ''
            });
        }
    }, [userData, reset]);

    const onSubmit = (data) => {
        updateProfileMutation.mutate(data);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Profile Information</h2>
                <p className="text-gray-600 mt-1">Update your personal information</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            {...register('name')}
                            className="w-full px-4 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                                border border-gray-300 font-medium placeholder-gray-600
                                shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                                focus:border-blue-400 transition-all duration-200"
                            placeholder='Enter you name'
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full px-4 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                                border border-gray-300 font-medium placeholder-gray-600
                                shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                                focus:border-blue-400 transition-all duration-200"
                            placeholder="Enter email address"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            {...register('phone')}
                            className="w-full px-4 py-3 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 
                                border border-gray-300 font-medium placeholder-gray-600
                                shadow-neumorphic-inset focus:shadow-soft focus:outline-none 
                                focus:border-blue-400 transition-all duration-200"
                            placeholder="Enter phone numbers"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!isDirty || updateProfileMutation.isLoading}
                        className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-blue-700 
                            text-white font-semibold shadow-md hover:shadow-lg 
                            active:shadow-neumorphic-pressed transition-all duration-200
                            disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {updateProfileMutation.isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            'Update Profile'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;
