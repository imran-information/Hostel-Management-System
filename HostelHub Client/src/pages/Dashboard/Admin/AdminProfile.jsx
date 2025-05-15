import { useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import useAdmin from "../../../hooks/useAdmin";
import { FiUsers, FiPieChart, FiCalendar, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Spinner from "../../shared/LoadingSpinner/Spiner";
import StatCard from '../../../components/Dashboard/Admin/AdminProfile/StatCard';
import ActivityItem from '../../../components/Dashboard/Admin/AdminProfile/ActityItem';
import { Link } from 'react-router';

const AdminProfile = () => {
    const { user } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [activeTab, setActiveTab] = useState('overview');

    const { isLoading, error, data: statsData } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure('/admin-stats');
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    });

    if (isLoading || isAdminLoading) return (
        <div className="flex justify-center items-center h-screen">
            <Spinner size="2xl" />
        </div>
    );

    if (error) return (
        <div className="text-center py-8 text-red-500">
            Error loading admin data: {error.message}
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6"
            >
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="relative">
                            <img
                                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'Moderator'}`}
                                alt="Profile"
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-indigo-100 object-cover shadow-md"
                            />
                            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${isAdmin ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                    {user?.displayName}
                                </h2>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {isAdmin ? 'Administrator' : 'Staff'}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm md:text-base">{user?.email}</p>
                            <p className="text-gray-400 text-xs mt-1">
                                Joined: {new Date(user?.metadata?.creationTime).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="my-6 border-t border-gray-100"></div>

                    {/* Stats Grid - Single implementation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            icon={FiPieChart}
                            title="Total Meals"
                            value={statsData?.totalMeals || 0}
                            trend="up"
                            change="12%"
                            color="indigo"
                        />
                        <StatCard
                            icon={FiUsers}
                            title="Active Users"
                            value={statsData?.activeUsers || 0}
                            trend="up"
                            change="5%"
                            color="emerald"
                        />
                        <StatCard
                            icon={FiCalendar}
                            title="Pending Reviews"
                            value={statsData?.pendingReviews || 0}
                            trend="down"
                            change="3"
                            color="amber"
                        />
                        <StatCard
                            icon={FiAward}
                            title="Top Rated"
                            value={statsData?.topRatedMeal?.rating || 0}
                            subtitle={statsData?.topRatedMeal?.title || 'N/A'}
                            color="rose"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Content Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    className={`px-4 py-2 font-medium text-sm ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button
                    className={`px-4 py-2 font-medium text-sm ${activeTab === 'activity' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('activity')}
                >
                    Recent Activity
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' ? (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Summary</h3>
                        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                            Chart
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <div className="space-y-3">

                                <button className="w-full text-left px-4 py-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                                    <Link className='w-full' to="/dashboard/add-meal">
                                        Add New Meal
                                    </Link>
                                </button>
                                <button className="w-full text-left px-4 py-3 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
                                    <Link className='w-full' to='/dashboard/user-management'  >
                                        Manage Users
                                    </Link>
                                </button> 
                                <button className="w-full text-left px-4 py-3 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors">
                                    <Link className='w-full' to="/dashboard/serve-meals"  >
                                        Review Submissions
                                    </Link>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                            <span className="text-sm text-gray-500">Last 7 days</span>
                        </div>

                        <div className="space-y-4">
                            {statsData?.recentActivity?.length > 0 ? (
                                statsData.recentActivity.map((activity, index) => (
                                    <ActivityItem
                                        key={index}
                                        action={activity.action}
                                        target={activity.target}
                                        timestamp={activity.timestamp}
                                        icon={activity.icon}
                                    />
                                ))
                            ) : (
                                <div className="py-8 text-center text-gray-400">
                                    No recent activity found
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )
            }
        </div >
    );
};

export default AdminProfile;