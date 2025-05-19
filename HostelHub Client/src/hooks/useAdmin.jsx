import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';  
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()
    // console.log(user, loading)

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/user/admin/${user?.email}`); 
                return res.data.isAdmin;
            } catch (error) {
                console.error("Error checking admin status:", error); 
            }
        }
    });
    
// console.log(isAdmin)
    return [isAdmin,  isAdminLoading];
};

export default useAdmin;

