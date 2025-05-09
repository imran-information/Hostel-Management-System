
import useAuth from '../../hooks/useAuth';
import AddMealForm from './Admin/AddMealFrom';
import UserManagement from './Admin/UserManagement';
import AdminProfile from './Admin/AdminProfile';
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    if (loading) return <div>Loading...</div>;

    if (!user || !['admin', 'moderator'].includes(user.role)) {
        navigate('/login');
        return null;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <AdminProfile />
                </div>
                <div className="lg:col-span-2 space-y-8">
                    {user.role === 'admin' && <UserManagement />}
                    <AddMealForm />
                    {/* Add other components like MealList, ReviewManagement etc. */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;