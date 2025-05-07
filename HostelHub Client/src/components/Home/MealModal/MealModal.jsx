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
import { FaUtensils, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';

const MealModal = ({ meal, children }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <DialogRoot>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogPortal>
                <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
                <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl z-50 overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
                        <DialogTitle className="text-xl font-bold text-gray-900">
                            {meal.title}
                        </DialogTitle>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className="text-gray-500 hover:text-red-500"
                            >
                                {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                            </button>
                            <DialogClose className="text-gray-500 hover:text-gray-700">
                                <Cross2Icon className="h-5 w-5" />
                            </DialogClose>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left Column - Image */}
                            <div className="space-y-4">
                                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={meal.image}
                                        alt={meal.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <FaStar className="text-yellow-400" />
                                        <span className="font-medium">{meal.rating || '4.5'}</span>
                                        <span className="text-gray-500 text-sm">
                                            ({meal.reviews?.length || 0} reviews)
                                        </span>
                                    </div>
                                    <span className="text-2xl font-bold text-indigo-600">
                                        ${meal.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Right Column - Details */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                                    <p className="text-gray-600">{meal.description}</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Ingredients</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {meal.ingredients.map((ingredient, index) => (
                                            <div key={index} className="flex items-center">
                                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                                <span className="text-gray-700">{ingredient}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Distributor</h3>
                                    <div className="flex items-center">
                                        <FaUtensils className="text-gray-400 mr-2" />
                                        <span className="text-gray-600">{meal.distributor}</span>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                                        Request This Meal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
    );
};

export default MealModal;