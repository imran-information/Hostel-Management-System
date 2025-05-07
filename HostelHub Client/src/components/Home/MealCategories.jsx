import { useState } from 'react';
import useMeals from '../../hooks/useMeals';
import MealCardSkeleton from './MealCardSkeletion';
import MealCard from './MealCard';

const MealCategories = () => {
    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'All'];
    const [activeCategory, setActiveCategory] = useState('All');
    const [isPending, error, meals] = useMeals()

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Failed to load meals</h2>
                <p className="text-red-500">Please try again later</p>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Meal Categories</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover delicious meals prepared fresh daily for our hostel residents
                </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${activeCategory === category
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Active Category Title */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                {activeCategory} Meals
                {meals && <span className="text-indigo-600 ml-2">({meals.length})</span>}
            </h2>

            {/* Meals Grid */}
            {isPending ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
                        <MealCardSkeleton key={i} />
                    ))}
                </div>
            ) : meals && meals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {meals.map((meal) => (
                        <MealCard key={meal._id} meal={meal} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-500">
                        No meals available in this category
                    </h3>
                    <p className="text-gray-400 mt-2">
                        Check back later or try another category
                    </p>
                </div>
            )}
        </section>
    );
};

export default MealCategories;