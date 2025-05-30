import {
    Root as DialogRoot,
    Trigger as DialogTrigger,
    Portal as DialogPortal,
    Overlay as DialogOverlay,
    Content as DialogContent,
    Title as DialogTitle,
    Close as DialogClose
} from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { FaUtensils, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../pages/shared/Button/Button';
import useAuth from '../../../hooks/useAuth';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

const MealModal = ({ meal, children, handleMealRequest, refetch }) => {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const [review, setReview] = useState({
        rating: 0,
        comment: '',
        mealName: meal.title,
        id: meal._id,
    });
    const [hoverRating, setHoverRating] = useState(0);

    const handleReviewSubmit = async () => {
        try {
            const newReview = {
                ...review,
                name: user?.displayName,
                email: user?.email,
            };

            const { data } = await axiosSecure.post('reviews', newReview);
            if (data.reviewId) {
                setReview({
                    rating: 0,
                    comment: '',
                    mealName: meal.title
                });
                setHoverRating(0);
                toast.success('Review submitted successfully!');
                refetch();
            }
        } catch (error) {
            if (error?.request?.response) {
                toast.error(error?.request?.response);
                return;
            }
            toast.error('Failed to submit review');
        }
    };

    return (
        <DialogRoot open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <AnimatePresence>
                {open && (
                    <DialogPortal forceMount>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                        </motion.div>

                        <DialogContent asChild forceMount>
                            <motion.div
                                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl z-50 overflow-y-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                {/* Header */}
                                <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 flex justify-between items-center z-10">
                                    <DialogTitle className="text-xl font-bold text-white">
                                        {meal.title}
                                    </DialogTitle>
                                    <DialogClose className="text-white hover:text-indigo-200 transition-colors">
                                        <Cross2Icon className="h-5 w-5" />
                                    </DialogClose>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Left Column - Image */}
                                        <div className="space-y-4">
                                            <motion.div
                                                className="relative aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden shadow-md"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <img
                                                    src={meal.image}
                                                    alt={meal.title}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2 text-white">
                                                            <FaStar className="text-yellow-400" />
                                                            <span className="font-medium">{meal.rating || '4.5'}</span>
                                                            <span className="text-sm text-white/80">
                                                                ({meal.reviews?.length || 0} reviews)
                                                            </span>
                                                        </div>
                                                        <span className="text-2xl font-bold text-white">
                                                            ${meal.price.toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <div className="bg-indigo-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                                                    <FaUtensils className="text-indigo-600 mr-2" />
                                                    Distributor
                                                </h3>
                                                <p className="text-gray-700">{meal.distributor}</p>
                                            </div>
                                        </div>

                                        {/* Right Column - Details */}
                                        <motion.div
                                            className="space-y-6"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                                                <p className="text-gray-600">{meal.description}</p>
                                            </div>

                                            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                                <h3 className="font-semibold text-gray-900 mb-3">Ingredients</h3>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {meal.ingredients?.map((ingredient, index) => (
                                                        <motion.div
                                                            key={index}
                                                            className="flex items-center"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.3 + index * 0.05 }}
                                                        >
                                                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                                            <span className="text-gray-700">{ingredient}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            {user && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    <Button iconPosition='right' icon={<ShoppingCart/>}
                                                        onClick={() => handleMealRequest({ id: meal._id, mealName: meal.title })}
                                                        className="w-full py-3 text-lg"
                                                        variant="primary"
                                                    >
                                                        Request This Meal 
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Review Form */}
                                    {user && (
                                        <motion.div 
                                            className="mt-8 bg-gray-50 p-6 rounded-xl"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">Leave a Review</h4>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                                                    How would you rate this meal?
                                                </label>
                                                <div className="flex justify-center space-x-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setReview({ ...review, rating: star })}
                                                            onMouseEnter={() => setHoverRating(star)}
                                                            onMouseLeave={() => setHoverRating(0)}
                                                            className="transition-transform hover:scale-125"
                                                        >
                                                            <FaStar
                                                                className={`h-8 w-8 ${star <= (hoverRating || review.rating)
                                                                    ? 'text-yellow-400'
                                                                    : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Review
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                                    value={review.comment}
                                                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                                                    placeholder="Share your experience with this meal..."
                                                />
                                            </div>

                                            <Button
                                                onClick={handleReviewSubmit}
                                                disabled={review.rating === 0 || review.comment.length === 0}
                                                className="w-full py-3"
                                                variant="primary"
                                            >
                                                Submit Review
                                            </Button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </DialogContent>
                    </DialogPortal>
                )}
            </AnimatePresence>
        </DialogRoot>
    );
};

export default MealModal;