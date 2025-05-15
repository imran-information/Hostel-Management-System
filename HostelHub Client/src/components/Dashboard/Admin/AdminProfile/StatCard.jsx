import { motion } from 'framer-motion';
import { FiTrendingUp } from 'react-icons/fi';

const StatCard = ({ icon: Icon, title, value, subtitle, trend, change, color }) => {
    const colorClasses = {
        indigo: {
            bg: 'bg-indigo-50',
            text: 'text-indigo-600',
            iconBg: 'bg-indigo-100'
        },
        emerald: {
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            iconBg: 'bg-emerald-100'
        },
        amber: {
            bg: 'bg-amber-50',
            text: 'text-amber-600',
            iconBg: 'bg-amber-100'
        },
        rose: {
            bg: 'bg-rose-50',
            text: 'text-rose-600',
            iconBg: 'bg-rose-100'
        }
    };

    return (
        <motion.div 
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`${colorClasses[color].bg} p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all`}
        >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${colorClasses[color].iconBg} ${colorClasses[color].text}`}>
                    <Icon size={24} />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
                    {subtitle && (
                        <p className="text-xs text-gray-500 truncate max-w-[120px]">
                            {subtitle}
                        </p>
                    )}
                    {change && (
                        <div className="flex items-center gap-1 mt-1">
                            <FiTrendingUp 
                                size={14} 
                                className={trend === 'up' ? 'text-green-500' : 'text-red-500'} 
                            />
                            <span className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {change} {trend === 'up' ? 'increase' : 'decrease'}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;