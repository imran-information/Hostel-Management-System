import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const ServeMeals = () => {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState({
        status: 'pending',
        studentId: ''
    });

    // Fetch meal requests
    const { data: requests = [], isLoading, isError } = useQuery({
        queryKey: ['mealRequests', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters.status) params.append('status', filters.status);
            if (filters.studentId) params.append('studentId', filters.studentId);

            const { data } = await axios.get(`/meal-requests?${params.toString()}`);
            return data;
        }
    });

    // Update status mutation
    const updateStatus = useMutation({
        mutationFn: ({ id, status }) =>
            axios.patch(`/meal-requests/${id}/status`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries(['mealRequests']);
        }
    });

    const handleStatusChange = (id, newStatus) => {
        updateStatus.mutate({ id, status: newStatus });
    };

    if (isLoading) return <div className="p-4">Loading requests...</div>;
    if (isError) return <div className="p-4 text-red-500">Error loading requests</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Serve Meals</h1>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex flex-wrap gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            className="p-2 border rounded"
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="served">Served</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Student ID</label>
                        <input
                            type="text"
                            className="p-2 border rounded"
                            placeholder="Filter by student ID"
                            value={filters.studentId}
                            onChange={(e) => setFilters({ ...filters, studentId: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Meal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requested</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    No requests found
                                </td>
                            </tr>
                        ) : (
                            requests.map((request) => (
                                <tr key={request._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium">{request.studentName}</div>
                                        <div className="text-sm text-gray-500">{request.studentId}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium">{request.mealName}</div>
                                        <div className="text-sm text-gray-500">{request.mealCategory}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Date(request.requestedAt).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            request.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                                                request.status === 'served' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        {request.status !== 'preparing' && (
                                            <button
                                                onClick={() => handleStatusChange(request._id, 'preparing')}
                                                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            >
                                                Mark Preparing
                                            </button>
                                        )}
                                        {request.status !== 'served' && (
                                            <button
                                                onClick={() => handleStatusChange(request._id, 'served')}
                                                className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            >
                                                Mark Served
                                            </button>
                                        )}
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