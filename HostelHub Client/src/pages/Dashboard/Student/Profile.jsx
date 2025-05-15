import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"; 
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const Profile = () => {
    const { user, loading } = useAuth();
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        photoURL: ''
    });

    const { isPending, error, data: student } = useQuery({
        queryKey: ['student', user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user.email}`);
            return data;
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: (updatedData) => axiosSecure.patch(`/users/${user.email}`, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries(['student', user.email]);
            setIsEditing(false);
        }
    });

    const handleEditClick = () => {
        setFormData({
            displayName: user.displayName || '',
            photoURL: user.photoURL || ''
        });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfileMutation.mutate(formData);
    };

    const getBadgeColor = (membership) => {
        switch (membership) {
            case 'Gold':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Silver':
                return 'bg-gray-100 text-gray-700 border-gray-300';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    if (loading || isPending) {
        return (
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center animate-pulse">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    <p className="text-gray-400 mt-4">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center text-red-500">
                    An error has occurred: {error.message}
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center">
                    <p className="text-gray-600">No user data available. Please sign in.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {isEditing ? (
                        <div className="relative">
                            <img
                                src={formData.photoURL || '/default-avatar.png'}
                                alt="User Profile"
                                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                                <button 
                                    className="p-1 text-blue-500 hover:text-blue-700"
                                    onClick={() => {
                                        const newUrl = prompt("Enter new profile image URL:", formData.photoURL);
                                        if (newUrl !== null) {
                                            setFormData(prev => ({ ...prev, photoURL: newUrl }));
                                        }
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <img
                            src={user?.photoURL || '/default-avatar.png'}
                            alt="User Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm transition-transform hover:scale-105"
                        />
                    )}

                    <div className="flex-1 text-center sm:text-left">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        id="displayName"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="flex space-x-3 pt-2">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                        disabled={updateProfileMutation.isLoading}
                                    >
                                        {updateProfileMutation.isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <h2 className="text-2xl font-semibold text-gray-800">{user.displayName}</h2>
                                <p className="text-gray-600 mt-1">{user.email}</p>
                                
                                <div className="mt-3 space-y-2">
                                    <span className={`inline-block px-4 py-1 border text-sm font-medium rounded-full ${getBadgeColor(student?.membership)}`}>
                                        {student?.membership ? student.membership.toUpperCase() : 'MEMBER'}
                                    </span>
                                    
                                    {student?.role && (
                                        <span className="ml-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                            {student.role.toUpperCase()}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <button
                                        onClick={handleEditClick}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {!isEditing && student && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Member Since</p>
                                <p className="text-gray-700">
                                    {new Date(student.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Last Updated</p>
                                <p className="text-gray-700">
                                    {new Date(student.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                            {student.membership && (
                                <div>
                                    <p className="text-sm text-gray-500">Membership Level</p>
                                    <p className="text-gray-700 capitalize">{student.membership}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;