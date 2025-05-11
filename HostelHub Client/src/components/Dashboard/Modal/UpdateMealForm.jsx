// components/MealFormModal.js
import { useState } from 'react';
import { FiUpload, FiLoader, FiPlus, FiX, FiChevronDown } from 'react-icons/fi';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../shared/Button/Button';
import toast from 'react-hot-toast';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import axios from 'axios';

const UpdateMealForm = ({
    isOpen,
    onClose,
    onSuccess,
    initialData = null,
    title = "Add New Meal",
    submitText = "Add Meal"
}) => {
    const [formData, setFormData] = useState(initialData || {
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size must be less than 5MB');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            toast.loading('Uploading image...', { id: 'image-upload' });
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );

            setFormData(prev => ({
                ...prev,
                image: response.data.data.url
            }));

            toast.success('Image uploaded successfully!', { id: 'image-upload' });
        } catch (error) {
            console.error('Image upload failed:', error);
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
            toast.loading('Saving meal...', { id: 'meal-submission' });

            const endpoint = initialData ? `/meals/${initialData._id}` : '/meals';
            const method = initialData ? 'put' : 'post';

            await axiosSecure[method](endpoint, formData);

            toast.success(initialData ? 'Meal updated successfully!' : 'Meal added successfully!',
                { id: 'meal-submission' });

            onSuccess?.();
            onClose();

            if (!initialData) {
                setFormData({
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
                setNewIngredient('');
            }

        } catch (error) {
            console.error('Failed to save meal:', error);
            toast.error(
                error.response?.data?.message || 'Failed to save meal. Please try again.',
                { id: 'meal-submission' }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal forceMount>
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <Dialog.Overlay asChild>
                                <motion.div
                                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </Dialog.Overlay>

                            <Dialog.Content asChild>
                                <motion.div
                                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-50 focus:outline-none"
                                    initial={{ opacity: 0, y: '-48%', scale: 0.95 }}
                                    animate={{ opacity: 1, y: '-50%', scale: 1 }}
                                    exit={{ opacity: 0, y: '-48%', scale: 0.95 }}
                                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                >
                                    <div className="border-b border-gray-100 pb-4 mb-6">
                                        <Dialog.Title className="text-2xl font-bold text-gray-800">
                                            {title}
                                        </Dialog.Title>
                                        <Dialog.Description className="text-gray-600 mt-1">
                                            {initialData ? 'Update the meal details' : 'Fill in the details to add a new meal'}
                                        </Dialog.Description>
                                        <Dialog.Close asChild>
                                            <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                                                <FiX size={24} />
                                            </button>
                                        </Dialog.Close>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* All your existing form fields go here */}
                                            {/* Keep the same form fields as your original component */}
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                                            <Button
                                                type="submit"
                                                loading={isSubmitting}
                                                disabled={isUploading || isSubmitting}
                                                className="px-8 py-3"
                                                variant="primary"
                                            >
                                                <FiPlus className="mr-2" />
                                                {submitText}
                                            </Button>
                                        </div>
                                    </form>
                                </motion.div>
                            </Dialog.Content>
                        </>
                    )}
                </AnimatePresence>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default UpdateMealForm;