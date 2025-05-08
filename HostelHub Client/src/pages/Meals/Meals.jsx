import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaHeart, FaRegHeart, FaUtensils, FaStar, FaFilter, FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import useMeals from '../../hooks/useMeals';
import MealCard from '../../components/Home/MealCard';
import MealCardSkeleton from '../../components/Home/MealCardSkeletion';


const Meals = () => {
    // Meal categories
    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'All'];
    const [activeCategory, setActiveCategory] = useState('All');
    const [priceFilter, setPriceFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const mealsPage = true
    const [isPending, error, meals = []] = useMeals(activeCategory, mealsPage, priceFilter, sortOrder, searchQuery);

    // console.log(meals);  
    // console.log(priceFilter);
    // console.log(sortOrder);
    console.log(searchQuery);
    const priceRanges = [
        { value: 'all', label: 'All Prices' },
        { value: '5', label: '$ (Under $5)' },
        { value: '10', label: '$$ ($5–$10)' },
        { value: '20', label: '$$$ ($10–$20)' },
        { value: 'expensive', label: '$$$$ (Over $20)' }
    ];




    // Handle like action (you might want to move this to a separate API call)
    const handleLike = (id) => {
        // This would need to be implemented with your backend API
        console.log(`Liked meal with id: ${id}`);
    };

    // Reset filters and search
    const resetFilters = () => {
        setActiveCategory('All');
        setPriceFilter('all');
        setSearchQuery('');
        setSortOrder('asc')
        setPage(1);
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaUtensils className="mr-2 text-indigo-600" /> Delicious Meals
                    </h1>
                </div>
            </header>

            {/* Search and Filters */}
            <div className="bg-white py-4 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Search Bar */}
                        <div className="relative flex-grow w-full md:w-auto">
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search meals..."
                                className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    <IoMdClose />
                                </button>
                            )}
                        </div>

                        {/* Filter Button (Mobile) */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full"
                        >
                            <FaFilter /> Filters
                        </button>
                    </div>
                    {/* Filters Section */}
                    <div className="mt-6 p-4 bg-gray-50 border rounded-lg shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                                <select
                                    className="w-full p-2 border rounded-md focus:ring-indigo-600 focus:border-indigo-600"
                                    value={activeCategory}
                                    onChange={(e) => setActiveCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            {/* Price Range Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Price Range</label>
                                <select
                                    className="w-full p-2 border rounded-md focus:ring-indigo-600 focus:border-indigo-600"
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                >
                                    {priceRanges.map(range => (
                                        <option key={range.value} value={range.value}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* price sorting   */}
                            <div className='flex gap-5'>
                                <div className="">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Price Sorting</label>
                                    <select
                                        className="w-full p-2 border rounded-md focus:ring-indigo-600 focus:border-indigo-600"
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                    >
                                        <option value="asc">Price: Low to High</option>
                                        <option value="desc">Price: High to Low</option>
                                    </select>
                                </div>


                                {/* Action Buttons */}
                                <div className="flex items-end gap-2">
                                    <button
                                        onClick={resetFilters}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Meals Grid */}
            <main className="container mx-auto px-4 py-8">
                {error && (
                    <div className="text-center py-12 text-red-500">
                        Error loading meals: {error.message}
                    </div>
                )}

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


            </main>
        </div>
    );
};

export default Meals;