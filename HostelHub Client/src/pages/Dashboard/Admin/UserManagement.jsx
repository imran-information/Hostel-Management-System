import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import { FiSearch, FiTrash2, FiEdit2 } from 'react-icons/fi';
import Spinner from '../../shared/LoadingSpinner/Spiner';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../components/Shared/Modal/ConfirmationModal';
import SectionHeader from '../../shared/SectionHeader/SectionHeader';

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    // Fetch users  
    const { isLoading, isError, error, data: users = [], refetch } = useQuery({
        queryKey: ['users', searchTerm],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users?searchUser=${searchTerm}`);
            return data;
        },
    });

    //  update  user role
    const handleRoleChange = async (userId, newRole) => {
        // console.log(userId, newRole);
        try {
            const loadingToast = toast.loading('Updating user role...', {
                id: `role-update-${userId}`
            });

            const { data } = await axiosSecure.patch(`/users/${userId}`, { newRole })
            if (data.modifiedCount === 1) {
                toast.success('Role updated successfully!', {
                    id: loadingToast
                });
                await refetch();
            } else {
                toast.error('No changes ', {
                    id: loadingToast,
                });
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Failed to update user role',
                {
                    duration: 4000,
                    id: `role-update-error-${userId}`
                }
            );
        }
    }

    // Delete user  
    const handleDeleteClick = (userId) => {
        setUserIdToDelete(userId);
        setIsModalOpen(true);
    };

    // modal confirm click to delete user
    const confirmDelete = async () => {
        try {
            const loadingToast = toast.loading('Deleting user...');
            const { data } = await axiosSecure.delete(`/users/${userIdToDelete}`);
            if (data.deletedCount === 1) {
                toast.success('User deleted successfully!', {
                    id: loadingToast
                });
                await refetch();
            } else {
                toast.error('User not found', { id: loadingToast });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete user');
            console.error('Delete error:', error);
        } finally {
            setIsModalOpen(false);
            setUserIdToDelete(null);
        }
    };

    if (isLoading) return <div className="flex justify-center mt-8"><Spinner /></div>;
    if (isError) return <div className="text-red-500 text-center mt-8">Error: {error.message}</div>;

    return (
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-md mt-5">
            <SectionHeader title={"User Management"} subtitle={"Manage all  User Management"} />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800"></h2>
                <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                {
                                                    user.photo ? <img src={user.photo} alt="" /> : (user.displayName?.charAt(0)?.toUpperCase() || 'U')
                                                }
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.displayName || 'No name'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="relative">
                                            <select
                                                value={user.role || 'student'}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white hover:border-gray-400"
                                            >
                                                <option value="student" className="py-1">Student</option>
                                                <option value="moderator" className="py-1 ">Moderator</option>
                                                <option value="admin" className="py-1">Admin</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleDeleteClick(user._id)}
                                            className="flex items-center px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
                                        >
                                            <FiTrash2 className="mr-1.5 h-4 w-4" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
                confirmText="Delete"
            />
        </div >
    );
};

export default UserManagement;