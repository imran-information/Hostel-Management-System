import useAuth from '../../../hooks/useAuth';

const AdminProfile = () => {
    const { user } = useAuth()

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
            <div className="flex items-center space-x-4 mb-4">
                <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="Admin"
                    className="w-20 h-20 rounded-full"
                />
                <div>
                    <h3 className="text-xl font-semibold">{user?.displayName}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-sm text-gray-500">Role: {user?.role}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-600">Total Meals Added</p>
                    <p className="text-2xl font-bold">1,248</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold">586</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;