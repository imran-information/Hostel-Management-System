import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const UpcomingMeals = () => {
    const [filters, setFilters] = useState({})
    console.log(filters);

    const { isLoading, error, data: upcomingMeals = [] } = useQuery({
        queryKey: ['upcomingMeals', filters?.minLikes, filters?.sortBy],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/upcoming-meals?minLikes=${filters?.minLikes}&sortBy=${filters?.sortBy}`);
            return data
        }

    })
    // console.log(upcomingMeals);

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Meals</h2>
            {/* Filter Controls */}

            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Min Likes:</label>
                    <select
                        className="p-2 border rounded"
                        value={filters.minLikes}
                        onChange={(e) => setFilters({ ...filters, minLikes: e.target.value })}
                    >
                        <option value="0">All</option>
                        <option value="5">5+ Likes</option>
                        <option value="10">10+ Likes</option>
                        <option value="20">20+ Likes</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Sort By:</label>
                    <select
                        className="p-2 border rounded"
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    >
                        <option value="likes">Most Liked</option>
                        <option value="date">Newest</option>
                    </select>
                </div>
            </div>

            {/* Meals List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {
                    upcomingMeals.length === 0
                        ? (
                            <p className="text-gray-500 col-span-full text-center">
                                No meals found with the current filters.
                            </p>
                        )
                        :
                        (
                            upcomingMeals.map((meal) => (
                                <div key={meal._id} className="bg-white shadow rounded-lg p-4">
                                    <img src={meal.image} alt={meal.title} className="w-full h-40 object-cover rounded" />
                                    <h2 className="text-xl font-semibold mt-2">{meal.title}</h2>
                                    <p className="text-gray-600">{meal.description}</p>
                                    <p className="text-sm mt-1">Category: {meal.category}</p>
                                    <p className="text-sm">Price: ${meal.price.toFixed(2)}</p>
                                    <p className="text-sm">Rating: {meal.rating} ⭐</p>
                                    <p className="text-sm">Distributor: {meal.distributor}</p>
                                    <p className="text-sm">Likes: {meal.likesCount}</p>
                                </div>
                            ))
                        )
                }
            </div>
        </div>
    );
};



export default UpcomingMeals;
