import { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUsers, FiCalendar, FiCoffee, FiStar, FiSettings, FiLogOut, FiBell } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo/logo-transparent.png'

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth()

    const navigationItems = [
        { name: 'Admin Profile', icon: <FiHome />, path: '/dashboard/admin-profile' },
        { name: 'User Management', icon: <FiUsers />, path: '/dashboard/user-management' },
        { name: 'Add Meal', icon: <FiCoffee />, path: '/dashboard/add-meal' },
        { name: 'Upcoming Meals', icon: <FiCalendar />, path: '/dashboard/upcoming' },
        { name: 'Reviews', icon: <FiStar />, path: '/dashboard/reviews' },
        { name: 'Settings', icon: <FiSettings />, path: '/dashboard/settings' },
    ];

    const handleLogout = () => {
        // Implement logout logic
        navigate('/login');
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
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
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
                        className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-100"
                        onClick={handleLogout}
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
                                    <p className="text-sm font-medium text-gray-700">Admin User</p>
                                    <p className="text-xs text-gray-500">Administrator</p>
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