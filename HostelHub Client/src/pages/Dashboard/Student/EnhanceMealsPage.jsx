import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaUtensils, FaStar, FaFilter, FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import useMeals from '../../../hooks/useMeals';
import MealCardSkeleton from '../../../components/Home/MealCardSkeletion';
import MealCard from '../../../components/Home/MealCard';

const EnhancedMealsPage = () => {
    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'All'];
    const [activeCategory, setActiveCategory] = useState('All');
    const [priceFilter, setPriceFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const mealsPage = true;
    const [isPending, error, meals = []] = useMeals(activeCategory, mealsPage, priceFilter, sortOrder, searchQuery);

    const priceRanges = [
        { value: 'all', label: 'All Prices' },
        { value: '5', label: '$ (Under $5)' },
        { value: '10', label: '$$ ($5–$10)' },
        { value: '20', label: '$$$ ($10–$20)' },
        { value: 'expensive', label: '$$$$ (Over $20)' }
    ];

    const resetFilters = () => {
        setActiveCategory('All');
        setPriceFilter('all');
        setSearchQuery('');
        setSortOrder('asc');
        setPage(1);
    };

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-slate-50  container mx-auto  py-8">
            {/* Search and Filters */}
            <div className="bg-white py-4  shadow-sm rounded-lg sticky top-0 z-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Search Bar with animation */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative flex-grow w-full md:w-auto"
                        >
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search meals..."
                                className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <IoMdClose />
                                </motion.button>
                            )}
                        </motion.div>

                        {/* Filter Button (Mobile) */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
                        >
                            <FaFilter /> Filters
                        </motion.button>
                    </div>

                    {/* Mobile Filters (Drawer) */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden overflow-hidden"
                            >
                                <div className="mt-4 p-4 bg-gray-50 border rounded-lg shadow-sm space-y-4">
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

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Sort By</label>
                                        <select
                                            className="w-full p-2 border rounded-md focus:ring-indigo-600 focus:border-indigo-600"
                                            value={sortOrder}
                                            onChange={(e) => setSortOrder(e.target.value)}
                                        >
                                            <option value="asc">Price: Low to High</option>
                                            <option value="desc">Price: High to Low</option>
                                        </select>
                                    </div>

                                    <button
                                        onClick={resetFilters}
                                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Desktop Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="hidden md:block mt-6 p-4 bg-gray-50 border rounded-lg shadow-sm"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                                <select
                                    className="w-full p-2 border rounded-md focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-200"
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

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Price Range</label>
                                <select
                                    className="w-full p-2 border rounded-md focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-200"
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

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Sort By</label>
                                <select
                                    className="w-full p-2 border rounded-md focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-200"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="asc">Price: Low to High</option>
                                    <option value="desc">Price: High to Low</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={resetFilters}
                                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Meals Grid */}
            <main className="container mx-auto py-8">
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 text-red-500"
                    >
                        Error loading meals: {error.message}
                    </motion.div>
                )}

                {/* Loading State */}
                {isPending ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {[...Array(8)].map((_, i) => (
                            <motion.div key={i} variants={item}>
                                <MealCardSkeleton />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : meals && meals.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {meals.map((meal) => (
                            <motion.div key={meal._id} variants={item}>
                                <MealCard meal={meal} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <h3 className="text-xl font-medium text-gray-500">
                            No meals available in this category
                        </h3>
                        <p className="text-gray-400 mt-2">
                            Check back later or try another category
                        </p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default EnhancedMealsPage;