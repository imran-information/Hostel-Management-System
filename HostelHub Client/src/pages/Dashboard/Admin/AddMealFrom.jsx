// components/AddMealForm.js
import { useState } from 'react';
import axios from 'axios';

const AddMealForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        rating: '',
        category: '',
        image: null
    });
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(
                'https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY',
                formData
            );
            setFormData(prev => ({
                ...prev,
                image: response.data.data.url
            }));
        } catch (error) {
            console.error('Image upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit meal data to your backend
        console.log('Meal data:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add New Meal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-gray-700">Meal Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Category</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="">Select Category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Rating (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        className="w-full p-2 border rounded"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows="3"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Meal Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 border rounded"
                        onChange={handleImageUpload}
                    />
                    {isUploading && <p className="text-blue-500">Uploading image...</p>}
                    {formData.image && (
                        <img
                            src={formData.image}
                            alt="Preview"
                            className="mt-2 h-20 object-cover rounded"
                        />
                    )}
                </div>
            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                disabled={isUploading}
            >
                Add Meal
            </button>
        </form>
    );
};

export default AddMealForm;