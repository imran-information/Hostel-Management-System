import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ServeMeals = () => {
    const [filters, setFilters] = useState({
        status: 'All',
        email: ''
    });
    const [searchEmail, setSearchEmail] = useState('')

    // Fetch meal requests
    const { data: requests = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['mealRequests', filters],
        queryFn: async () => {
            const params = {};
            if (filters.status !== 'All') params.status = filters.status;
            if (filters.email) params.email = filters.email;

            const { data } = await axiosSecure.get('/meal-requests', { params });
            return data;
        }
    });


    console.log(searchEmail)
 


    const handleStatusChange = async (id, newStatus) => {
        console.log(id, newStatus)
        try {
            const { data } = await axiosSecure.patch(`/meal-requests/${id}`, { status: newStatus })
            console.log(data)

            if (data.result?.modifiedCount) {
                toast.success('Meal Served Successfully')
            } else if (data.message) {
                toast.success(data.message)
            }
            await refetch()
        } catch (error) {
            toast.error('Something went wrong while updating the status')
            console.error(error)
        }
    }


    if (isLoading) return <div className="p-4">Loading requests...</div>;
    if (isError) return <div className="p-4 text-red-500">Error loading requests</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Serve Meals</h1>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            value={searchEmail}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        >
                            <option value="All">All Requests</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-1">Student Email</label>
                       {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative flex-grow w-full md:w-auto"
                        >
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search meals..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    <IoMdClose />
                                </motion.button>
                            )}
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    No matching requests found
                                </td>
                            </tr>
                        ) : (
                            requests.map((request) => (
                                <tr key={request._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{request.userName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{request.userEmail}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{request.mealName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Date(request.requestedAt).toLocaleString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${request.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                            request.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            {request.status === 'Processing' && (
                                                <button
                                                    onClick={() => handleStatusChange(request._id, 'Cancelled')}
                                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {request.status !== 'Completed' && request.status !== 'Cancelled' && (
                                                <button
                                                    onClick={() => handleStatusChange(request._id, 'Completed')}
                                                    className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600 transition-colors"
                                                >
                                                    Confirm
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServeMeals;