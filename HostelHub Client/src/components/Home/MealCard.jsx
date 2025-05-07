import { Link } from 'react-router';
import { FaHeart, FaRegHeart, FaUtensils, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const MealCard = ({ meal }) => {
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(false);

    // Format price with 2 decimal places
    const formattedPrice = meal.price.toFixed(2);

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Meal Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={meal.image}
                    alt={meal.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                {/* Like Button */}
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="absolute top-3 right-3 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
                    aria-label={isLiked ? 'Unlike meal' : 'Like meal'}
                >
                    {isLiked ? (
                        <FaHeart className="text-red-500" />
                    ) : (
                        <FaRegHeart className="text-gray-600" />
                    )}
                </button>
                {/* Category Badge */}
                <span className="absolute bottom-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    {meal.category}
                </span>
            </div>

            {/* Meal Content */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                        {meal.title}
                    </h3>
                    <span className="text-indigo-600 font-bold">${formattedPrice}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {meal.description}
                </p>

                <div className="flex items-center justify-between">
                    {/* Rating */}
                    <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-700">
                            {meal.rating || '4.5'}
                        </span>
                        <span className="text-gray-400 text-sm ml-1">
                            ({meal.reviews?.length || 0})
                        </span>
                    </div>

                    {/* Distributor */}
                    <div className="flex items-center">
                        <FaUtensils className="text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{meal.distributor}</span>
                    </div>
                </div>

                {/* View Details Button */}
                <Link
                    to={`/meals/${meal._id}`}
                    className="block mt-4 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium py-2 px-4 rounded text-center transition-colors"
                >
                    View Details
                </Link>

                {/* Request Button (only for logged in users) */}
                {user && (
                    <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors">
                        Request Meal
                    </button>
                )}
            </div>
        </div>
    );
};

export default MealCard;