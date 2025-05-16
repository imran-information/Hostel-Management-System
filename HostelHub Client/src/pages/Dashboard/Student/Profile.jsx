import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Spinner from '../../shared/LoadingSpinner/Spiner';
import ProfileUpdateModal from '../../shared/Modal/ProfileUpdateModal/ProfileUpdateModal';
import SectionHeader from '../../shared/SectionHeader/SectionHeader';

const Profile = () => {
    const { user, loading, } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { isPending, error, data: student } = useQuery({
        queryKey: ['student', user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user.email}`);
            return data;
        }
    });
    // console.log(student)

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const getBadgeColor = (membership) => {
        switch (membership) {
            case 'Gold':
                return 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border-yellow-200';
            case 'Silver':
                return 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border-gray-200';
            default:
                return 'bg-gradient-to-r from-gray-50 to-white text-gray-600 border-gray-100';
        }
    };

    if (loading || isPending) return <Spinner />;

    if (error) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-xl shadow-md p-6 text-center text-red-500">
                    <h3 className="text-lg font-medium mb-2">Error Loading Profile</h3>
                    <p>{error.message}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No User Found</h3>
                    <p className="text-gray-600">Please sign in to view your profile</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto  py-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="p-6 sm:p-8">
                    <SectionHeader
                        title="My Profile"
                        subtitle="Manage your account information"
                        center={false}
                    />

                    <div className="flex flex-col md:flex-row gap-8 mt-8">
                        {/* Profile Image Section */}
                        <div className="flex-shrink-0 flex flex-col items-center">
                            <div className="relative group">
                                <img
                                    src={student?.photo || '/default-avatar.png'}
                                    onError={(e) => { e.target.onerror = null; e.target.src = '/default-avatar.png'; }}
                                    alt="User Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:border-blue-100"
                                />

                                <div className="absolute inset-0 rounded-full   bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                    <button
                                        onClick={handleEditClick}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-2 shadow-md"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleEditClick}
                                className="mt-4 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>

                        {/* Profile Details Section */}
                        <div className="flex-1">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{user.displayName}</h2>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(student?.membership)}`}>
                                        {student?.membership ? student.membership.toUpperCase() : 'MEMBER'}
                                    </span>

                                    {student?.role && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                            {student.role.toUpperCase()}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Member Since</p>
                                            <p className="text-gray-700 font-medium">
                                                {new Date(student?.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</p>
                                            <p className="text-gray-700 font-medium">
                                                {new Date(student?.updatedAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        {student?.membership && (
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Membership Level</p>
                                                <p className="text-gray-700 font-medium capitalize">{student.membership}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ProfileUpdateModal
                            isOpen={isModalOpen}
                            onClose={handleModalClose}
                            student={student}
                            isLoading={isPending}
                        />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Profile;