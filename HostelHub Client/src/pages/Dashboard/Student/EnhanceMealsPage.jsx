import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const EnhancedMealsPage = () => {
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        minPrice: '',
        maxPrice: ''
    });

    const { data: meals } = useQuery(['meals', filters], () =>
        
        axios.get('/meals/enhanced', { params: filters }).then(res => res.data)
    );

    return (
        <div className="container mx-auto p-4">
            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Search meals..."
                        className="p-2 border rounded"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                    <select
                        className="p-2 border rounded"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">All Categories</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Min price"
                        className="p-2 border rounded"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Max price"
                        className="p-2 border rounded"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    />
                </div>
            </div>

            {/* Meals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {meals?.map(meal => (
                    <MealCard key={meal._id} meal={meal} />
                ))}
            </div>
        </div>
    );
};

const MealCard = ({ meal }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <img src={meal.image} alt={meal.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <div className="flex justify-between">
                    <h3 className="text-lg font-bold">{meal.title}</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {meal.reviews?.length || 0} reviews
                    </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{meal.description}</p>
                <div className="mt-3 flex justify-between items-center">
                    <span className="font-bold">${meal.price.toFixed(2)}</span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className={`p-2 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                        >
                            ♥
                        </button>
                        <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                        >
                            Review
                        </button>
                        <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                            Request
                        </button>
                    </div>
                </div>

                {showReviewForm && (
                    <ReviewForm mealId={meal._id} />
                )}
            </div>
        </div>
    );
};

export default EnhancedMealsPage;