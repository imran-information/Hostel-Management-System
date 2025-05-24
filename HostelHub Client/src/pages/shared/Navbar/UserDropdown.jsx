import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
import Button from '../Button/Button';
import { Link } from 'react-router';
import useAdmin from '../../../hooks/useAdmin';
import Spinner from '../LoadingSpinner/Spiner';

const UserDropdown = ({ handleSignOutUser }) => {
    const { user, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isAdmin, isAdminLoading] = useAdmin()

    // console.log(user)


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // console.log(isAdmin)

    return (
        <div className="flex items-center space-x-2">

            <div className="relative" ref={dropdownRef}>
                <motion.button
                    className="flex space-x-2 focus:outline-none items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="User menu"
                    aria-expanded={isOpen}
                >
                    <div className="relative">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || 'User'}
                                className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-300 object-cover border-2"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-600 rounded-full text-sm font-medium text-white">
                                {user?.displayName?.charAt(0) || 'U'}
                            </div>
                        )}
                    </div>
                    <span className="font-medium text-sm text-gray-900 dark:text-white">{user.displayName || 'User'}</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-4 h-4 ml-1 text-gray-500 dark:text-gray-400"
                    >
                        <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor" />
                        </svg>
                    </motion.div>
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-2 min-w-[220px] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 z-50"
                        >
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        {
                                            user?.photoURL && <img
                                                src={user?.photoURL}
                                                alt={user.displayName}
                                                className="w-10 h-10 rounded-full object-cover"

                                            />
                                        }

                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{user.displayName || 'User'}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {user.email || 'No email'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-1">
                                {/* Admin/Modaretor Dashboard  */}
                                {
                                    isAdmin
                                        ?
                                        <>
                                            <Link to={`/dashboard/admin-profile`}>
                                                <button
                                                    className="w-full text-left text-sm leading-none rounded flex items-center h-9 px-2 relative select-none outline-none text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 15 15" fill="none">
                                                        <path d="M7.5 0C3.36 0 0 3.36 0 7.5C0 11.64 3.36 15 7.5 15C11.64 15 15 11.64 15 7.5C15 3.36 11.64 0 7.5 0ZM7.5 2C8.33 2 9 2.67 9 3.5C9 4.33 8.33 5 7.5 5C6.67 5 6 4.33 6 3.5C6 2.67 6.67 2 7.5 2ZM7.5 13C5.99 13 4.68 12.37 3.86 11.43C3.86 10.31 6.89 9.75 7.5 9.75C8.11 9.75 11.14 10.31 11.14 11.43C10.32 12.37 9.01 13 7.5 13Z" fill="currentColor" />
                                                    </svg>
                                                    Admin Profile
                                                </button>
                                            </Link>
                                            <Link to='/dashboard/user-management'>
                                                <button
                                                    className="w-full text-left text-sm leading-none rounded flex items-center h-9 px-2 relative select-none outline-none text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 15 15" fill="none">
                                                        <path d="M7.5 0L0 4V11L7.5 15L15 11V4L7.5 0ZM7.5 1.94L13 5.06L7.5 8.12L2 5.06L7.5 1.94ZM1 6.06L6.5 9.12V13.06L1 10.06V6.06ZM8.5 13.06V9.12L14 6.06V10.06L8.5 13.06Z" fill="currentColor" />
                                                    </svg>
                                                    Admin Dashboard
                                                </button>
                                            </Link>
                                        </>
                                        :
                                        <>
                                            {/* Student Dashboard  */}
                                            <Link to={`/dashboard/student-profile`}>
                                                <button
                                                    className="w-full text-left text-sm leading-none rounded flex items-center h-9 px-2 relative select-none outline-none text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 15 15" fill="none">
                                                        <path d="M7.5 0C3.36 0 0 3.36 0 7.5C0 11.64 3.36 15 7.5 15C11.64 15 15 11.64 15 7.5C15 3.36 11.64 0 7.5 0ZM7.5 2C8.33 2 9 2.67 9 3.5C9 4.33 8.33 5 7.5 5C6.67 5 6 4.33 6 3.5C6 2.67 6.67 2 7.5 2ZM7.5 13C5.99 13 4.68 12.37 3.86 11.43C3.86 10.31 6.89 9.75 7.5 9.75C8.11 9.75 11.14 10.31 11.14 11.43C10.32 12.37 9.01 13 7.5 13Z" fill="currentColor" />
                                                    </svg>
                                                    Student Profile
                                                </button>
                                            </Link>
                                            <Link to='/dashboard/my-reviews'>
                                                <button
                                                    className="w-full text-left text-sm leading-none rounded flex items-center h-9 px-2 relative select-none outline-none text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 15 15" fill="none">
                                                        <path d="M7.5 0L0 4V11L7.5 15L15 11V4L7.5 0ZM7.5 1.94L13 5.06L7.5 8.12L2 5.06L7.5 1.94ZM1 6.06L6.5 9.12V13.06L1 10.06V6.06ZM8.5 13.06V9.12L14 6.06V10.06L8.5 13.06Z" fill="currentColor" />
                                                    </svg>
                                                    Student Dashboard
                                                </button>
                                            </Link>
                                        </>
                                }

                                <div className="h-[1px] bg-gray-200 dark:bg-gray-700 my-1" />

                                <button
                                    className="w-full text-left text-sm leading-none rounded flex items-center h-9 px-2 relative select-none outline-none text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => {
                                        setIsOpen(false);
                                        handleSignOutUser();
                                    }}
                                >
                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 15 15" fill="none">
                                        <path d="M3 1C2.44772 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C11.0523 14 11.5 13.5523 11.5 13V10.5C11.5 10.2239 11.2761 10 11 10C10.7239 10 10.5 10.2239 10.5 10.5V13H3V2L10.5 2V4.5C10.5 4.77614 10.7239 5 11 5C11.2761 5 11.5 4.77614 11.5 4.5V2C11.5 1.44772 11.0523 1 10.5 1H3ZM12.8536 4.85355L14.8536 6.85355C15.0488 7.04882 15.0488 7.3654 14.8536 7.56066L12.8536 9.56066C12.6583 9.75592 12.3417 9.75592 12.1464 9.56066C11.9512 9.3654 11.9512 9.04882 12.1464 8.85355L13.2929 7.70711H6.5C6.22386 7.70711 6 7.48325 6 7.20711C6 6.93097 6.22386 6.70711 6.5 6.70711H13.2929L12.1464 5.56066C11.9512 5.3654 11.9512 5.04882 12.1464 4.85355C12.3417 4.65829 12.6583 4.65829 12.8536 4.85355Z" fill="currentColor" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
};

export default UserDropdown;