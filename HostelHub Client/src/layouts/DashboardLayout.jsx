import { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUsers, FiCalendar, FiCoffee, FiStar, FiLogOut, FiBell, FiList, FiCheckCircle, FiNavigation, FiBox, } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo/logo-transparent.png'
import toast from 'react-hot-toast';
import useAdmin from '../hooks/useAdmin';
import Spinner from '../pages/shared/LoadingSpinner/Spiner';
import { MessageCircle } from 'lucide-react';
import { RiOrderPlayFill } from 'react-icons/ri';
import { MdPayments } from 'react-icons/md';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, signOutUser, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()


    if (loading || isAdminLoading) return (
        <div className="flex justify-center items-center h-screen">
            <Spinner size="lg" />
        </div>
    );

    let navigationItems = [];

    if (isAdmin) {
        navigationItems = [
            { name: 'Admin Profile', icon: <FiHome />, path: '/dashboard/admin-profile' },
            { name: 'User Management', icon: <FiUsers />, path: '/dashboard/user-management' },
            { name: 'Add Meal', icon: <FiCoffee />, path: '/dashboard/add-meal' },
            { name: 'All Meals', icon: <FiList />, path: '/dashboard/all-meals' },
            { name: 'Upcoming Meals', icon: <FiCalendar />, path: '/dashboard/upcoming-meals' },
            { name: 'Reviews', icon: <FiStar />, path: '/dashboard/review-management' },
            { name: 'Serve Meals', icon: <FiNavigation />, path: '/dashboard/serve-meals' },
        ];

    } else {
        navigationItems = [
            { name: 'Profile', icon: <FiUsers />, path: '/dashboard/student-profile' },
            { name: 'My Reviews', icon: <MessageCircle />, path: '/dashboard/my-reviews' },
            { name: 'My Requests', icon: <RiOrderPlayFill />, path: '/dashboard/my-requests' },
            { name: 'My Payments', icon: <MdPayments />, path: '/dashboard/my-payments' },
            { name: 'Enhanced Meals', icon: <FiBox />, path: '/dashboard/enhanced-Meals' },
            
        ]
    }



    const handleSignOutUser = () => {
        const toastId = toast.loading(
            <div className="flex items-center gap-2">
                <FiLogOut className="text-blue-500" />
                <span>Signing out...</span>
            </div>,
            {
                position: 'top-center',
                duration: 4000,
            }
        );

        signOutUser()
            .then(() => {
                toast.success(
                    <div className="flex items-center gap-2">
                        <FiCheckCircle className="text-green-500" />
                        <span>Successfully signed out!</span>
                    </div>,
                    {
                        id: toastId,
                        position: 'top-center',
                        duration: 4000,
                    }
                );

                navigate('/login');
            })
            .catch(error => {
                toast.error(
                    <div className="flex items-center gap-2">
                        <FiAlertCircle className="text-red-500" />
                        <span>Sign out failed: {error.message}</span>
                    </div>,
                    {
                        id: toastId,
                        position: 'top-center',
                        duration: 5000,
                    }
                );
            });
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-black shadow-md transform transition-transform duration-200 ease-in-out flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:translate-x-0`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <Link to='/' className="text-xl font-bold text-indigo-600">
                        <img src={logo} alt="" />
                    </Link>
                    <button
                        className="p-1 rounded-md text-gray-500 hover:text-gray-600 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-1">
                        {navigationItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${location.pathname === item.path
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-white hover:bg-indigo-600 '
                                        }`}
                                    onClick={() => {
                                        navigate(item.path);
                                        setSidebarOpen(false);
                                    }}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    <span>{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t">
                    <button
                        className="flex items-center w-full p-3 text-white rounded-lg hover:bg-indigo-600"
                        onClick={handleSignOutUser}
                    >
                        <FiLogOut className="mr-3" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navigation */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between p-4">
                        <button
                            className="p-2 rounded-md text-gray-500 hover:text-gray-600 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <FiMenu size={20} />
                        </button>

                        <div className="flex items-center space-x-4">
                            <button className="p-1 rounded-full text-gray-500 hover:text-gray-600 relative">
                                <div className="relative">
                                    <FiBell size={20} />
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                </div>
                            </button>

                            <div className="flex items-center">
                                <div className="mr-3 text-right">
                                    <p className="text-sm font-medium text-gray-700">{isAdmin ? 'Admin' : 'Student'}</p>
                                    <p className="text-xs text-gray-500">{isAdmin ? 'Administrator' : 'Student'}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                                    <img src={user?.photoURL} alt="" />

                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;