import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';  
import ConfirmationModal from '../../../components/Shared/Modal/ConfirmationModal';
import toast from 'react-hot-toast';

const MyMealRequests = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cancleId, setCancleId] = useState(null)

    // Fetch student/user meal requests from backend
    const { data: mealsRequests = [], refetch } = useQuery({
        queryKey: ['mealsRequests', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/meal-requests/${user.email}`);
            return data;
        }
    });

    const handleCancelRequest = (id) => {
        setCancleId(id)
        setIsModalOpen(true)

    }


    // modal confirm click to Cancle Meal Order 
    const confirmDelete = async () => {
        try {
            const loadingToast = toast.loading('Cancleling Order...');
            const { data } = await axiosSecure.patch(`/meal-requests/${cancleId}`);

            if (data.modifiedCount === 1) {
                toast.success('Order cncelled successfully!', { id: loadingToast });
                await refetch();
            } else {
                toast.error('Order not found', { id: loadingToast });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete Order');
            console.error('Update error:', error);
        } finally {
            setIsModalOpen(false);
            setCancleId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };



    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">My Meal Requests</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mealsRequests.map((request) => (
                            <tr key={request._id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.mealName || 'N/A'}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {new Date(request.requestedAt).toLocaleString('en-US', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short'
                                    })}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">0{request.quantity}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        {request.status === 'Processing' && (
                                            <>
                                                <button
                                                    className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                                                    onClick={() => handleCancelRequest(request._id)}
                                                    aria-label={`Cancel ${request.mealName} order`}
                                                >
                                                    Cancel Order
                                                </button>
                                            </>
                                        )}
                                        {request.status === 'Cancelled' && (
                                            <span className="px-2 py-1 text-xs font-medium text-orange-800 bg-orange-100 rounded-full">
                                                Cancelled
                                            </span>
                                        )}
                                        {request.status === 'Completed' && (
                                            <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                                                Completed
                                            </span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cancel Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Cancellation"
                message="Are you sure you want to Cancle this Order? This action cannot be undone."
                confirmText="Yes, Cancel"
            />

        </div>
    );
};

export default MyMealRequests;
