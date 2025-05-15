import { motion } from 'framer-motion';

// Activity Item Component
const ActivityItem = ({ action, target, timestamp, icon }) => {
    const getActionColor = (action) => {
        const actionLower = action.toLowerCase();
        if (actionLower.includes('add')) return { bg: 'bg-green-100', text: 'text-green-600' };
        if (actionLower.includes('delete')) return { bg: 'bg-red-100', text: 'text-red-600' };
        if (actionLower.includes('update')) return { bg: 'bg-blue-100', text: 'text-blue-600' };
        return { bg: 'bg-gray-100', text: 'text-gray-600' };
    };

    const colors = getActionColor(action);

    return (
        <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 group"
        >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colors.bg} ${colors.text} shadow-sm group-hover:shadow-md transition-all`}>
                {icon || action.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-700">
                    <span className="font-medium capitalize">{action}</span> {target}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    {new Date(timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.div>
    );
};

export default ActivityItem;