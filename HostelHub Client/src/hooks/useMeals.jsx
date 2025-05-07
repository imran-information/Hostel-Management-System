import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useMeals = () => {
    const { isPending, error, data: meals } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/meals`);
                return response.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || 'Failed to fetch meals');
            }

        }
    })


    return [isPending, error, meals]
};

export default useMeals;