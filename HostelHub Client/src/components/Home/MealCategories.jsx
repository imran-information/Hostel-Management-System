import { useState } from 'react';
import useMeals from '../../hooks/useMeals';
import MealCard from './MealCard';
import SectionHeader from '../../pages/shared/SectionHeader/SectionHeader'; 
import Button from '../../pages/shared/Button/Button';
import { ArrowBigRight } from 'lucide-react';
import MealCardSkeleton from './MealCardSkeletion';

const MealCategories = () => {
    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'All'];
    const [activeCategory, setActiveCategory] = useState('All');
    const mealsPage = false;
    const [isPending, error, meals, refetch] = useMeals(activeCategory, mealsPage);

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Failed to load meals</h2>
                <p className="text-red-500 text-sm sm:text-base">Please try again later</p>
            </div>
        );
    }

    return (
        <section className="container mx-auto sm:px-6 px-4 xl:px-0 py-8 sm:py-12 lg:py-16">
            <SectionHeader
                title="Our Meal Categories"
                subtitle="Discover delicious meals prepared fresh daily for our hostel residents."
            />

            {/* Category Tabs - Using your custom Button component */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
                {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        variant={activeCategory === category ? 'primary' : 'ghost'} 
                        className={`rounded-full ${activeCategory === category ? 'shadow-md hover:shadow-lg' : ''}`}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Active Category Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
                {activeCategory} Meals
                {meals && <span className="text-indigo-600 ml-1 sm:ml-2">({meals.length})</span>}
            </h2>

            {/* Meals Grid */}
            {isPending ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[...Array(8)].map((_, i) => (
                        <MealCardSkeleton key={i} />
                    ))}
                </div>
            ) : meals && meals.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {meals.map((meal) => (
                        <MealCard refetch={refetch} key={meal._id} meal={meal} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 sm:py-12">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-500">
                        No meals available in this category
                    </h3>
                    <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
                        Check back later or try another category
                    </p>
                </div>
            )}

            {meals && (
                <div className="flex justify-center mt-8">
                    <Button
                        to='/meals'
                        icon={<ArrowBigRight />}
                        iconPosition='right'
                        size='large'
                        className="shadow-lg hover:shadow-xl transition-shadow"
                    >
                        View All Meals
                    </Button>
                </div>
            )}
        </section>
    );
};

export default MealCategories;