import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaUtensils, FaStar, FaFilter, FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import useMeals from '../../hooks/useMeals';
import MealCard from '../../components/Home/MealCard';
import MealCardSkeleton from '../../components/Home/MealCardSkeletion';
import Button from '../shared/Button/Button';

const Meals = () => {
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

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-slate-50 ">
            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className=" bg-black shadow w-full "
            >
                <div className="container mx-auto px-4 py-4 flex items-center pt-30 ">
                    <h1 className="text-2xl font-bold text-white flex items-center">
                        <FaUtensils className="mr-2 text-indigo-600" /> Delicious Meals
                    </h1>
                </div>
            </motion.header>

            {/* Search & Filters */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Search Bar */}
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
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    <IoMdClose />
                                </motion.button>
                            )}
                        </motion.div>

                        {/* Filter Toggle Button (Mobile) */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                        >
                            <FaFilter /> Filters
                        </motion.button>
                    </div>

                    {/* Mobile Filters Drawer */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden overflow-hidden"
                            >
                                <div className="mt-4 p-4 bg-gray-100 rounded-lg space-y-4">
                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Category</label>
                                        <select
                                            className="w-full p-2 border rounded-md focus:ring-indigo-600"
                                            value={activeCategory}
                                            onChange={(e) => setActiveCategory(e.target.value)}
                                        >
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Price Range</label>
                                        <select
                                            className="w-full p-2 border rounded-md focus:ring-indigo-600"
                                            value={priceFilter}
                                            onChange={(e) => setPriceFilter(e.target.value)}
                                        >
                                            {priceRanges.map(range => (
                                                <option key={range.value} value={range.value}>{range.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Sort Order */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Sort By</label>
                                        <select
                                            className="w-full p-2 border rounded-md focus:ring-indigo-600"
                                            value={sortOrder}
                                            onChange={(e) => setSortOrder(e.target.value)}
                                        >
                                            <option value="asc">Price: Low to High</option>
                                            <option value="desc">Price: High to Low</option>
                                        </select>
                                    </div>

                                    {/* Reset Button */}
                                    <button
                                        onClick={resetFilters}
                                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
                        className="hidden md:block mt-6 p-4 bg-gray-100 rounded-lg"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    className="w-full p-2 border rounded-md focus:ring-indigo-600"
                                    value={activeCategory}
                                    onChange={(e) => setActiveCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Price Range</label>
                                <select
                                    className="w-full p-2 border rounded-md focus:ring-indigo-600"
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                >
                                    {priceRanges.map(range => (
                                        <option key={range.value} value={range.value}>{range.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Sort By</label>
                                <select
                                    className="w-full p-2 border rounded-md focus:ring-indigo-600"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="asc">Price: Low to High</option>
                                    <option value="desc">Price: High to Low</option>
                                </select>
                            </div>

                            {/* Reset */}
                            <div className="flex items-end"> 
                                <Button  className='w-full py-3' onClick={resetFilters}>Reset Filters</Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Meals List */}
            <main className="container mx-auto px-4 py-10">
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-red-600"
                    >
                        Error loading meals: {error.message}
                    </motion.div>
                )}

                {isPending ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {meals.map(meal => (
                            <motion.div key={meal._id} variants={item}>
                                <MealCard meal={meal} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-600 mt-16"
                    >
                        <h3 className="text-xl font-semibold">No meals available in this category</h3>
                        <p className="text-sm mt-2 text-gray-400">Try another filter or check back later.</p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default Meals;
