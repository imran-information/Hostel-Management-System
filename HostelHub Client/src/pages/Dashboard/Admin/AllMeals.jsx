import React, { useState } from 'react';
import axios from 'axios';
import useMeals from '../../../hooks/useMeals';
import { FiFilter, FiSearch, FiX, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Spinner from '../../shared/LoadingSpinner/Spiner';
import Button from '../../shared/Button/Button';
import toast from 'react-hot-toast';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import ConfirmationModal from '../../../components/Shared/Modal/ConfirmationModal';
import { Link } from 'react-router';

const AllMeals = () => {
    // State management
    const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    const [activeCategory, setActiveCategory] = useState('All');
    const [priceFilter, setPriceFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
    const mealsPage = true;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mealIdToDelete, setMealIdToDelete] = useState(null);


    const [isPending, error, meals, refetch] = useMeals(
        activeCategory,
        mealsPage,
        priceFilter,
        sortConfig.direction,
        searchQuery
    );

    // console.log(meals);

    // clear filter Handlers 
    const resetFilters = () => {
        setActiveCategory('All');
        setPriceFilter('all');
        setSearchQuery('');
        setSortConfig({ key: 'title', direction: 'asc' });
    };



    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleDelete = async (id) => {
        setMealIdToDelete(id)
        setIsModalOpen(true);
    };


    // modal confirm click to delete Meal
    const confirmDelete = async () => {
        try {
            const loadingToast = toast.loading('Deleting meal...');
            const { data } = await axiosSecure.delete(`/meals/${mealIdToDelete}`);
            if (data.deletedCount === 1) {
                toast.success('Meal deleted successfully!', {
                    id: loadingToast
                });
                await refetch();
            } else {
                toast.error('Meal not found', { id: loadingToast });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete meal');
            console.error('Delete error:', error);
        } finally {
            setIsModalOpen(false);
            setMealIdToDelete(null);
        }
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Meal Management</h1>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
                >
                    {showFilters ? <FiX size={18} /> : <FiFilter size={18} />}
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {/* Filter Section */}
            {showFilters && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                            <div className="relative">
                                <FiSearch className="absolute left-3 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search meals..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={activeCategory}
                                onChange={(e) => setActiveCategory(e.target.value)}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end">
                            <Button className='w-full py-2.5' onClick={resetFilters}>Reset Filters</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Meals Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {isPending ? (
                    <Spinner />
                ) : error ? (
                    <div className="p-8 text-center text-red-500">Error loading meals: {error.message}</div>
                ) : meals.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No meals found. Try adjusting your filters.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['title', 'category', 'price', 'rating'].map((key) => (
                                        <th
                                            key={key}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSort(key)}
                                        >
                                            <div className="flex items-center">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                                {sortConfig.key === key && (
                                                    <span className="ml-1">
                                                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {meals.map((meal) => (
                                    <tr key={meal._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={meal.image} alt={meal.title} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{meal.title}</div>
                                                    <div className="text-sm text-gray-500 line-clamp-1">{meal.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {meal.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${meal.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`h-5 w-5 ${i < parseInt(meal.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <Link to={`/dashboard/updateMeal/${meal._id}`}>
                                                    <button className="flex items-center px-3 py-1.5 text-sm bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors"
                                                    >
                                                        <FiEdit2 className="mr-1.5 h-4 w-4" />
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(meal._id)}
                                                    className="flex items-center px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
                                                >
                                                    <FiTrash2 className="mr-1.5 h-4 w-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Meal"
                message="Are you sure you want to delete this meal? This action cannot be undone."
                confirmText="Delete"
            />

        </div>
    );
};

export default AllMeals;