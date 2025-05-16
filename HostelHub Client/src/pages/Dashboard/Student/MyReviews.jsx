import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../../components/Shared/Modal/ConfirmationModal';
import SectionHeader from '../../shared/SectionHeader/SectionHeader';

const MyReviews = () => {
    const { user, loading } = useAuth();
    const [isEditingReview, setIsEditingReview] = useState(null);
    const [reviewId, setReviewId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        rating: 5,
        comment: ''
    });

    // Fetch user reviews
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews/${user.email}`);
            return data;
        }
    });

    const handleReviewEditClick = (review) => {
        setReviewForm({
            rating: review.rating,
            comment: review.comment
        });
        setIsEditingReview(review._id);
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReviewSubmit = async (e, reviewId) => {
        e.preventDefault();

        const reviewdata = {
            rating: parseInt(reviewForm.rating),
            comment: reviewForm.comment
        }

        try {
            await axiosSecure.patch(`/reviews/${reviewId}`, reviewdata)
            setIsEditingReview(null);
            setReviewForm({ rating: '', comment: '' });
            toast.success('Review updated successfully');
            refetch();

        } catch (error) {
            toast.error(`Update failed: ${error.message}`);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        setReviewId(reviewId)
        setIsModalOpen(true)
    };

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

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
                ★
            </span>
        ));
    };

    return (
        <div className="container mx-auto  py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden pt-8">
                <SectionHeader
                    title="My Reviews"
                    subtitle={`${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}`}
                />
                {reviews.length === 0 ? (
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-16 w-16 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-700">No reviews yet</h3>
                        <p className="mt-2 text-gray-500">You haven't written any reviews.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="border border-gray-100 rounded-lg p-5 hover:shadow-md transition-shadow bg-gray-100"
                            >
                                {isEditingReview === review._id ? (
                                    <form onSubmit={(e) => handleReviewSubmit(e, review._id)} className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Rating
                                                </label>
                                                <select
                                                    id="rating"
                                                    name="rating"
                                                    value={reviewForm.rating}
                                                    onChange={handleReviewChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                                                    required
                                                >
                                                    {[1, 2, 3, 4, 5].map((num) => (
                                                        <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex items-end">
                                                <div className="text-xl">
                                                    {renderStars(reviewForm.rating)}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                                                Review
                                            </label>
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                value={reviewForm.comment}
                                                onChange={handleReviewChange}
                                                rows={4}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                                                required
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditingReview(null)}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-3 h-full flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
                                                    {review.mealName || 'Untitled Review'}
                                                </h3>
                                                <div className="flex items-center mt-1 space-x-2">
                                                    <div className="flex text-lg">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        {review.date && new Date(review.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleReviewEditClick(review)}
                                                    className="text-gray-400 hover:text-blue-500 transition-colors"
                                                    title="Edit review"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteReview(review._id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                    title="Delete review"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mt-3 line-clamp-3 flex-grow">
                                            {review.comment}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Review"
                message="Are you sure you want to delete this review? This action cannot be undone."
                confirmText="Delete"
                confirmColor="red"
            />
        </div>
    );
};

export default MyReviews;