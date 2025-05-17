import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import SectionHeader from '../../shared/SectionHeader/SectionHeader';

const UpcomingMeals = () => {
    const [filters, setFilters] = useState({
        minLikes: '',
        sortBy: 'likes' // Default sort by likes
    });

    const { isLoading, error, data: upcomingMeals = [] } = useQuery({
        queryKey: ['upcomingMeals', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters.minLikes) params.append('minLikes', filters.minLikes);
            if (filters.sortBy) params.append('sortBy', filters.sortBy);

            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/upcoming-meals?${params.toString()}`
            );
            return data;
        }
    });

    if (isLoading) return <div className="text-center py-8">Loading meals...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <SectionHeader
                title="Upcoming Meals"
                subtitle="Browse and filter upcoming meal options"
            />

            {/* Filter Controls */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium mb-1">Minimum Likes:</label>
                    <select
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={filters.minLikes}
                        onChange={(e) => setFilters({ ...filters, minLikes: e.target.value })}
                    >
                        <option value="">All Meals</option>
                        <option value="5">5+ Likes</option>
                        <option value="10">10+ Likes</option>
                        <option value="20">20+ Likes</option>
                        <option value="50">50+ Likes</option>
                    </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium mb-1">Sort By:</label>
                    <select
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    >
                        <option value="likes">Most Liked</option>
                        <option value="date">Newest First</option>
                    </select>
                </div>
            </div>

            {/* Meals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingMeals.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No meals match your filters.</p>
                        <button
                            onClick={() => setFilters({ minLikes: '', sortBy: 'likes' })}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    upcomingMeals.map((meal) => (
                        <div key={meal._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <img
                                src={meal.image}
                                alt={meal.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-semibold">{meal.title}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                        {meal.likesCount} Likes
                                    </span>
                                </div>
                                <p className="text-gray-600 mt-2 line-clamp-2">{meal.description}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="bg-gray-100 px-2 py-1 text-xs rounded">{meal.category}</span>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded">
                                        ${meal.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UpcomingMeals;