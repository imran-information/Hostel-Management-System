import { useState } from 'react';
import { useQuery  } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../../components/Shared/Modal/ConfirmationModal';

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

    // console.log(reviews)




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

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                ★
            </span>
        ));
    };

    return (
        <div className="container mx-auto py-8">
            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">My Reviews</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {reviews.length} reviews
                    </span>
                </div>

                {reviews.length === 0 ? (
                    <div className="text-center py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                        <p className="mt-1 text-sm text-gray-500">You haven't written any reviews.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                                {isEditingReview === review._id ? (
                                    <form onSubmit={(e) => handleReviewSubmit(e, review._id)} className="space-y-4">
                                        <div>
                                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                                                Rating
                                            </label>
                                            <select
                                                id="rating"
                                                name="rating"
                                                value={reviewForm.rating}
                                                onChange={handleReviewChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            >
                                                {[1, 2, 3, 4, 5].map((num) => (
                                                    <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                                                ))}
                                            </select>
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
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="flex space-x-3 pt-2">
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"


                                            > Save Changes

                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditingReview(null)}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center">
                                                    <div className="text-lg mr-2">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        {<p>{review.date && new Date(review.date).toLocaleDateString()}</p>}
                                                    </span>
                                                </div>
                                                <h4 className="mt-1 text-sm font-medium text-gray-900">
                                                    {review.mealName || 'Untitled Review'}
                                                </h4>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleReviewEditClick(review)}
                                                    className="p-1 text-blue-500 hover:text-blue-700"
                                                    title="Edit review"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteReview(review._id)}
                                                    className="p-1 text-red-500 hover:text-red-700"
                                                    title="Delete review"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600">
                                            {review.comment}
                                        </p>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
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

export default MyReviews;