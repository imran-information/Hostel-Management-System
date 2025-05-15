import React, { useState } from 'react';
import { useQuery, } from '@tanstack/react-query'
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import Spinner from '../../shared/LoadingSpinner/Spiner';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../components/Shared/Modal/ConfirmationModal';
import { FiTrash2 } from 'react-icons/fi';


const ReviewManagement = () => {
    const [reviewId, setReviewId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    // fetch all reviews 
    const { isLoading, error, data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/reviews')
            return data
        }
    })
    // console.log(reviews); 

    // Delete a review
    const handleDeleteReview = async (reviewId) => {
        // console.log(reviewId);
        setReviewId(reviewId)
        setIsModalOpen(true)
    };


    // modal confirm click to delete Meal
    const confirmDelete = async () => {
        try {
            const loadingToast = toast.loading('Deleting review...');
            const { data } = await axiosSecure.delete(`/reviews/${reviewId}`);
            if (data.deletedCount === 1) {
                toast.success('Review deleted successfully!', { id: loadingToast });
                await refetch();
            } else {
                toast.error('Review not found', { id: loadingToast });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete meal');
            console.error('Delete error:', error);
        } finally {
            setIsModalOpen(false);
            setReviewId(null);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Review Management</h1>
            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {isLoading ? (
                <Spinner />
            ) : (
                /* Reviews Table */
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border">User</th>
                                <th className="py-2 px-4 border">Rating</th>
                                <th className="py-2 px-4 border">Comment</th>
                                <th className="py-2 px-4 border">Meal ID</th>
                                <th className="py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <tr key={review._id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border">{review.userName || 'Anonymous'}</td>
                                        <td className="py-2 px-4 border">
                                            {Array.from({ length: review.rating }).map((_, i) => (
                                                <span key={i}>⭐</span>
                                            ))}
                                        </td>

                                        <td className="py-2 px-4 border">{review.comment}</td>
                                        <td className="py-2 px-4 border">{review._id}</td>
                                        <td className="py-2 px-4 border">
                                            <button
                                                onClick={() => handleDeleteReview(review._id)}
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
                                    <td colSpan="5" className="py-4 text-center text-gray-500">
                                        No reviews found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Review"
                message="Are you sure you want to delete this review? This action cannot be undone."
                confirmText="Delete"
            />
        </div>
    );
};

export default ReviewManagement;