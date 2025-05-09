import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import icon from '../../../../public/icon.png'
const Footer = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
            <div className="container mx-auto px-6 py-12 lg:py-16">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
                >
                    {/* Company Info */}
                    <motion.div variants={item} className="space-y-4">
                        <h3 className="text-2xl font-bold text-white flex items-center">
                            <img className='w-20' src={icon} alt="" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                HostelHub
                            </span>
                        </h3>
                        <p className="text-gray-400">
                            Building innovative solutions for modern problems with cutting-edge technology.
                        </p>
                        <div className="flex space-x-4">
                            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map((Icon, index) => (
                                <motion.a
                                    key={index}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors duration-300"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={item} className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Services', 'Portfolio', 'Blog'].map((link, index) => (
                                <motion.li key={index} whileHover={{ x: 5 }}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                                    >
                                        <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                                        {link}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={item} className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Our Services</h4>
                        <ul className="space-y-2">
                            {['Web Development', 'App Development', 'UI/UX Design', 'Digital Marketing', 'SEO'].map((service, index) => (
                                <motion.li key={index} whileHover={{ x: 5 }}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                                    >
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        {service}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={item} className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <MdLocationOn className="text-cyan-400 mt-1 mr-3 flex-shrink-0" size={18} />
                                <p className="text-gray-400">123 Business Ave, Suite 456, San Francisco, CA 94107</p>
                            </div>
                            <div className="flex items-center">
                                <MdPhone className="text-cyan-400 mr-3" size={18} />
                                <a href="tel:+11234567890" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    +1 (123) 456-7890
                                </a>
                            </div>
                            <div className="flex items-center">
                                <MdEmail className="text-cyan-400 mr-3" size={18} />
                                <a href="mailto:info@company.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    info@company.com
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-10"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} HostelHub. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 text-sm">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 text-sm">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;