import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaUtensils, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import MealModal from './MealModal/MealModal';
import Button from '../../pages/shared/Button/Button';
import LikedAuthModal from './LikedAuthModal/LikedAuthModal';

const MealCard = ({ meal }) => {
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const formattedPrice = meal.price.toFixed(2);

    const handleLikedMeal = (mealId) => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        setIsLiked(true)
        console.log('Liking meal:', mealId);
    };

    const handleUnLikedMeal = (mealId) => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        setIsLiked(false)
        // Your existing unlike logic
        console.log('Unliking meal:', mealId);
    };

    return (
        <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            whileHover={{ y: -5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Meal Image with Zoom Effect */}
            <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden flex-shrink-0">
                <motion.img
                    src={meal.image}
                    alt={meal.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    initial={{ scale: 1 }}
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Like Button */}
                <motion.button

                    className="absolute top-3 right-3 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
                    aria-label={isLiked ? 'Unlike meal' : 'Like meal'}
                    whileTap={{ scale: 0.9 }}
                >
                    {isLiked ? (
                        <FaHeart onClick={() => handleUnLikedMeal(meal._id)} className="text-indigo-600" />
                    ) : (
                        <FaRegHeart onClick={() => handleLikedMeal(meal._id)} className="text-indigo-500 hover:text-indigo-600 transition-colors" />
                    )}
                </motion.button>

                {/* Category Badge */}
                <span className="absolute bottom-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                    {meal.category}
                </span>
            </div>

            {/* Meal Content */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-1">
                        {meal.title}
                    </h3>
                    <span className="text-indigo-600 font-bold whitespace-nowrap ml-2">${formattedPrice}</span>
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                    {meal.description}
                </p>

                <div className="flex items-center justify-between mb-4 mt-auto">
                    {/* Rating */}
                    <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm sm:text-base font-medium text-gray-700">
                            {meal.rating || '4.5'}
                        </span>
                        <span className="text-gray-400 text-xs sm:text-sm ml-1">
                            ({meal.reviews?.length || 0})
                        </span>
                    </div>

                    {/* Distributor */}
                    <div className="flex items-center ">
                        <FaUtensils className="text-gray-400 mr-1 text-sm" />
                        <span className="text-xs sm:text-sm text-gray-500 truncate max-w-[80px] sm:max-w-[100px]">
                            {meal.distributor}
                        </span>
                    </div>
                </div>

                {/* Action Buttons  bottom */}
                <div className=" space-y-2 flex justify-between items-center">
                    <MealModal meal={meal}>
                        <Button variant='outline' >Quick View</Button>
                    </MealModal>

                    {user && (
                        <Button >Request Meal</Button>
                    )}
                </div>
            </div>
            <LikedAuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </motion.div>
    );
};

export default MealCard;