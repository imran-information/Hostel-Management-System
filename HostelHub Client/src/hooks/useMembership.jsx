import { useQuery } from '@tanstack/react-query'; 
import useAuth from './useAuth';
import { axiosSecure } from './useAxiosSecure';

const useMembership = () => {   
    const {user, loading} = useAuth()

    const { data: membership, isLoading: membershipLoading, refetch } = useQuery({
        queryKey: ['membership', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/users/${user.email}`);
                return data.membership;
            } catch (error) {
                console.error("Error membership Fetch:", error);
                return '';
            }
        }
    });

    // console.log(membership)
    return [membership, membershipLoading, refetch];

};

export default useMembership;