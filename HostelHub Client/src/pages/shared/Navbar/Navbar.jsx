import { Link, NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import logo from '../../../assets/logo/logo-transparent.png';
import Button from '../Button/Button';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { FiLogOut, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import UserDropdown from './UserDropdown';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = (
        <>
            <li>
                <NavLink
                    to='/'
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Home <span className="nav-link-indicator" />
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/meals'
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Meals <span className="nav-link-indicator" />
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/food-safety'
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Food Safety <span className="nav-link-indicator" />
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/social-impact'
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Social Impact <span className="nav-link-indicator" />
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/cooking-challenge'
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Challenge <span className="nav-link-indicator" />
                </NavLink>
            </li>
            <li>
                <NavLink
                    to='/about'
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    About <span className="nav-link-indicator" />
                </NavLink>
            </li>
        </>
    );

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
                setMobileMenuOpen(false);
                navigate('/');
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
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-filter ${isScrolled ? 'bg-black/80 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 lg:px-0">
                <div className="flex items-center justify-between">
                    {/* Logo - Hidden on mobile */}
                    <Link to='/' className="hidden lg:flex items-center">
                        <img className='w-40 lg:w-60' src={logo} alt="Logo" />
                    </Link>

                    {/* Mobile Menu Button - Left side on mobile */}
                    <div className="flex lg:hidden items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-white rounded-lg focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        <ul className={`flex space-x-5 text-white font-bold font-oswald text-lg`}>
                            {links}
                        </ul>
                    </nav>

                    {/* Auth Buttons/Dropdown - Always shown on right side */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                {/* Show UserDropdown on both mobile and desktop when logged in */}
                                <UserDropdown handleSignOutUser={handleSignOutUser} />
                            </>
                        ) : (
                            <>
                                {/* Mobile - Always show buttons */}
                                <div className="flex space-x-2">
                                    <Button isOutlet variant='outline' className='text-white' to="/login"  >
                                        Login
                                    </Button>
                                    <Button to="/signup"  >
                                        Sign Up
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu - Only shown when mobileMenuOpen is true */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="pt-4 pb-4 space-y-4 bg-black/90 backdrop-blur-sm rounded-lg mt-2">
                                <ul className="space-y-4 px-4">
                                    {React.Children.toArray(links).map((link, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {link}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;