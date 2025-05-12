// pages/UpdateMealPage.js
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiUpload, FiLoader, FiPlus, FiX, FiChevronDown } from 'react-icons/fi';
import Button from '../../shared/Button/Button';
import toast from 'react-hot-toast';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../shared/LoadingSpinner/Spiner';

const UpdateMealPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        rating: 3,
        category: '',
        image: null,
        ingredients: [],
        distributor: '',
        likesCount: 0
    });

    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');


    const { isLoading, error, data: mealData } = useQuery({
        queryKey: [`meal_${id}`],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/meals/${id}`);
                setFormData(response.data);
                return response.data;
            } catch (err) {
                toast.error('Failed to load meal data');
                throw err;
            } finally {
                console.log("object");
            }
        }
    });

    console.log(mealData);

    if (isLoading) return <Spinner />

    if (error) return 'An error has occurred: ' + error.message


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size must be less than 5MB');
            return;
        }

        setIsUploading(true);
        const imgFormData = new FormData();
        imgFormData.append('image', file);

        try {
            toast.loading('Uploading image...', { id: 'image-upload' });
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                imgFormData
            );
            setFormData(prev => ({ ...prev, image: response.data.data.url }));
            toast.success('Image uploaded successfully!', { id: 'image-upload' });
        } catch (error) {
            toast.error('Image upload failed. Please try again.', { id: 'image-upload' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.price || !formData.category || !formData.image) {
            toast.error('Please fill all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            toast.loading('Updating meal...', { id: 'meal-submission' });
            await axiosSecure.put(`/meals/${mealId}`, formData);
            toast.success('Meal updated successfully!', { id: 'meal-submission' });
            navigate('/meals'); // redirect after success
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Failed to update meal.',
                { id: 'meal-submission' }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center mt-12 text-gray-500">
                <FiLoader className="animate-spin mx-auto mb-2" />
                Loading meal...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">Update Meal</h2>
                    <p className="text-gray-600 mt-1">Edit the meal details below</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Meal Title */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Meal Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Vegetable Pizza"
                            />
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none pr-8"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                    <option value="snack">Snacks</option>
                                </select>
                                <FiChevronDown className="absolute right-3 top-3.5 text-gray-400" />
                            </div>
                        </div>

                        {/* Distributor */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Distributor
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                value={formData.distributor}
                                onChange={(e) => setFormData({ ...formData, distributor: e.target.value })}
                                placeholder="e.g. Pizza Place"
                            />
                        </div>

                        {/* Rating */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Rating
                            </label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="0.5"
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                />
                                <span className="text-sm font-medium text-indigo-600 w-8 text-center">
                                    {formData.rating}
                                </span>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center bg-indigo-50 px-3 py-1 rounded-full">
                                        <span className="text-indigo-700 text-sm">{ingredient}</span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = [...formData.ingredients];
                                                updated.splice(index, 1);
                                                setFormData({ ...formData, ingredients: updated });
                                            }}
                                            className="ml-2 text-indigo-500 hover:text-indigo-700"
                                        >
                                            <FiX size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Add ingredient (press Enter)"
                                    value={newIngredient}
                                    onChange={(e) => setNewIngredient(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && newIngredient.trim()) {
                                            e.preventDefault();
                                            setFormData({
                                                ...formData,
                                                ingredients: [...formData.ingredients, newIngredient.trim()]
                                            });
                                            setNewIngredient('');
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (newIngredient.trim()) {
                                            setFormData({
                                                ...formData,
                                                ingredients: [...formData.ingredients, newIngredient.trim()]
                                            });
                                            setNewIngredient('');
                                        }
                                    }}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors flex items-center"
                                >
                                    <FiPlus size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                required
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-[120px]"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe the meal..."
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Meal Image</label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <label className={`flex-1 flex flex-col items-center justify-center h-40 border-2 ${formData.image ? 'border-indigo-200' : 'border-gray-200'} border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden`}>
                                    {isUploading && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                                            <FiLoader className="animate-spin text-indigo-600" size={24} />
                                        </div>
                                    )}
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                                        <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                                        <p className="mb-1 text-sm text-gray-500">
                                            {formData.image ? 'Change image' : 'Click to upload'}
                                        </p>
                                        <p className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                    />
                                </label>

                                {formData.image && (
                                    <div className="flex-1">
                                        <div className="h-40 relative rounded-xl overflow-hidden border border-gray-200">
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: null })}
                                                className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                                            >
                                                <FiX className="text-gray-700" size={16} />
                                            </button>
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                                <p className="text-white text-sm truncate">Preview</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                        <Button
                            type="submit"
                            loading={isSubmitting}
                            disabled={isUploading || isSubmitting}
                            className="px-8 py-3"
                            variant="primary"
                        >
                            <FiLoader className="mr-2" />
                            Update Meal
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMealPage;
