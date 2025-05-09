// components/AuthModal.js
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const LikedAuthModal = ({ isOpen, onClose }) => {
    const location = useLocation();
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>

                        <h3 className="text-xl font-bold text-gray-800 mb-4">Login Required</h3>
                        <p className="text-gray-600 mb-6">
                            Please login to like this meal. It helps us recommend more meals you'll love!
                        </p>

                        <div className="flex gap-4">
                            <Link
                                to="/login"
                                state={{ from: location.pathname }} replace
                                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 transition-colors"
                                onClick={onClose}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                state={{ from: location.pathname }} replace
                                className="flex-1 border border-indigo-600 text-indigo-600 py-2 px-4 rounded-md text-center hover:bg-indigo-50 transition-colors"
                                onClick={onClose}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </motion.div>
                </div >
            )}
        </AnimatePresence >
    );
};

export default LikedAuthModal;