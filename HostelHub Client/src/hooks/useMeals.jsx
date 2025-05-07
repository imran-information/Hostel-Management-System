// useMeals.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useMeals = (category) => {
    const { isPending, error, data: meals } = useQuery({
        queryKey: ['meals', category], // Include category in queryKey
        queryFn: async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/meals?category=${category}`);;
                return response.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || 'Failed to fetch meals');
            }
        }
    });

    return [isPending, error, meals];
};

export default useMeals;