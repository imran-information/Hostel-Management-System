import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const user = false
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user && <Link className="btn"> Sing Out</Link>

                }
                <Link to='/login' className='btn'>Login</Link>
                <Link to='/signup' className='btn' >Sign Up</Link>
            </div>
        </div >
    );
};

export default Navbar;

// // components/Navbar.jsx
// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
  
//     return (
//       <nav className="bg-white shadow-sm sticky top-0 z-40">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <img src="/logo.png" alt="Logo" className="h-8" />
//             </div>
            
//             {/* Desktop Navigation */}
//             <div className="hidden md:flex space-x-8">
//               <NavLink to="/">Home</NavLink>
//               <NavLink to="/meals">Meals</NavLink>
//               <NavLink to="/facilities">Facilities</NavLink>
//               <NavLink to="/contact">Contact</NavLink>
//             </div>
            
//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//               <button 
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="text-gray-500 hover:text-gray-900"
//               >
//                 <MenuIcon className="h-6 w-6" />
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden overflow-hidden"
//             >
//               <div className="px-4 pb-4 space-y-2">
//                 <MobileNavLink to="/">Home</MobileNavLink>
//                 <MobileNavLink to="/meals">Meals</MobileNavLink>
//                 <MobileNavLink to="/facilities">Facilities</MobileNavLink>
//                 <MobileNavLink to="/contact">Contact</MobileNavLink>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>
//     );
//   };