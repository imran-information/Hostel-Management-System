import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
// import { axiosSecure } from './useAxiosSecure';
import axios from 'axios';

const useAdmin = () => {
    const { user, loading } = useAuth();

    const { data: adminData, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                const res = await axios.get(`http://localhost:5000/user/admin`, {
                    email: user.email
                });
                return res.data;
            } catch (error) {
                console.error("Error checking admin status:", error);
                return { isAdmin: false };
            }
        }
    });

    return [adminData?.isAdmin || false, isAdminLoading];
};

export default useAdmin;