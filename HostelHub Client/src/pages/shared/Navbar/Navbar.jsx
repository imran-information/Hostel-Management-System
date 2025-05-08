import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../../assets/logo/logo-transparent.png'
import Button from '../Button/Button';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { FiLogOut, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, signOutUser } = useAuth()
    console.log(user);

    const navigate = useNavigate()
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = (
        <>
            <li><NavLink to='/' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home <span className="nav-link-indicator" /></NavLink></li>
            <li><NavLink to='/meals' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Meals <span className="nav-link-indicator" /></NavLink></li>
            <li><NavLink to='/food-safety' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Food Safety <span className="nav-link-indicator" /></NavLink></li>
            <li><NavLink to='/social-impact' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Social Impact <span className="nav-link-indicator" /></NavLink></li>
            <li><NavLink to='/cooking-challenge' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Challenge <span className="nav-link-indicator" /></NavLink></li>
            <li><NavLink to='/about' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About <span className="nav-link-indicator" /></NavLink></li>
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

                navigate('/')
                console.log('Successfully signed out!');
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
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-invert backdrop-opacity-10  ${isScrolled ? 'bg-black/100 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to='/'>
                            {
                                isScrolled ? <img className='w-60' src={logo} alt="" /> : <img className='w-60' src={logo} alt="" />
                            }
                        </Link>

                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        <ul className={`flex space-x-5 text-white font-bold font-oswald text-lg`}>
                            {links}
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-indigo-50 transition-colors"
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

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {
                            user ? (
                                <Button onClick={handleSignOutUser}>Sign Out</Button>
                            ) : (
                                <>
                                    <Button isOutlet variant="secondary" to='/login' >Login</Button>
                                    <Button to='/signup'>Sign Up</Button>
                                </>
                            )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 space-y-2  ">
                        <ul className="space-y-2">
                            {links}
                        </ul>
                        <div className="pt-4 space-y-2 border-t border-gray-100">
                            {user ? (
                                <Button onClick={handleSignOutUser}>Sign Out</Button>
                            ) : (
                                <>
                                    <Button isOutlet variant="secondary" to='/login' >Login</Button>
                                    <Button to='/signup'>Sign Up</Button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header >
    );
};

export default Navbar;