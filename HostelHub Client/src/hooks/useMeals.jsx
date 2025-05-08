// useMeals.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useMeals = (category, mealsPage, priceFilter, sortOrder, searchQuery) => {
    const { isPending, error, data: meals } = useQuery({
        queryKey: ['meals', category, mealsPage, priceFilter, sortOrder, searchQuery],
        queryFn: async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/meals?category=${category}&mealsPage=${mealsPage}&priceFilter=${priceFilter}&sortOrder=${sortOrder}&searchQuery=${searchQuery}`);;
                return response.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || 'Failed to fetch meals');
            }
        }
    });

    return [isPending, error, meals];
};

export default useMeals;