import { FaCertificate, FaShieldAlt, FaClipboardCheck, FaDownload, FaPlayCircle } from 'react-icons/fa';
import { GiCook } from 'react-icons/gi';
import { motion } from 'framer-motion';

const FoodSafety = () => {
    const badgeVariants = {
        hover: {
            y: -5,
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    const cardVariants = {
        offscreen: {
            y: 50,
            opacity: 0
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative py-28 text-white overflow-hidden"
            >
                {/* Background gradient with animated elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600">
                    {/* Animated floating elements */}
                    <motion.div
                        animate={{
                            x: [0, 20, 0],
                            y: [0, 30, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-indigo-500 opacity-20"
                    />
                    <motion.div
                        animate={{
                            x: [0, -30, 0],
                            y: [0, 40, 0],
                            rotate: [0, -8, 0]
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: 2
                        }}
                        className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-purple-500 opacity-15"
                    />
                </div>

                <div className="relative container mx-auto px-4 text-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="inline-block mb-6"
                    >
                        <FaCertificate className="text-6xl text-white drop-shadow-lg" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl font-bold mb-4 text-white drop-shadow-md"
                    >
                        Food Safety Excellence
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl max-w-3xl mx-auto"
                    >
                        Our commitment to the highest standards of food safety and hygiene
                    </motion.p>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 max-w-7xl">
                {/* Guidelines Section */}
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
                >
                    {/* Hygiene Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden group"
                    >
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <FaShieldAlt className="text-3xl text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Hygiene Guidelines</h3>
                            <ul className="space-y-3 text-gray-600">
                                {[
                                    "Hand washing protocols",
                                    "Safe food temperatures",
                                    "Cross-contamination prevention",
                                    "Proper storage techniques",
                                    "Sanitization procedures"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-green-500 mr-3 mt-1">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-8 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all flex items-center gap-3 w-full justify-center shadow-md hover:shadow-lg"
                            >
                                <FaDownload className="text-lg" />
                                Download Guidelines
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Tutorials Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden group"
                    >
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <GiCook className="text-3xl text-teal-600" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Interactive Training</h3>

                            <div className="relative rounded-xl overflow-hidden mb-6 bg-gray-100 aspect-video flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 opacity-80"></div>
                                <div className="relative z-10 text-center p-6">
                                    <FaPlayCircle className="text-5xl text-white mx-auto mb-4 opacity-90" />
                                    <h4 className="text-white font-medium text-lg">Food Handling Masterclass</h4>
                                    <p className="text-teal-100 text-sm mt-1">15 min tutorial</p>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl hover:from-teal-700 hover:to-teal-600 transition-all flex items-center gap-3 w-full justify-center shadow-md hover:shadow-lg"
                            >
                                <FaPlayCircle className="text-lg" />
                                Browse All Courses
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Certification Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden group"
                    >
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <FaClipboardCheck className="text-3xl text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Get Certified</h3>
                            <p className="text-gray-600 mb-6">
                                Complete our comprehensive food safety program and showcase your certification badges.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {[
                                    { name: 'Basic', color: 'yellow' },
                                    { name: 'Advanced', color: 'orange' },
                                    { name: 'Professional', color: 'purple' },
                                    { name: 'Allergen', color: 'red' },
                                    { name: 'Eco', color: 'green' }
                                ].map((badge, index) => (
                                    <span
                                        key={index}
                                        className={`px-4 py-1.5 bg-${badge.color}-50 text-${badge.color}-700 rounded-full text-sm font-medium border border-${badge.color}-200 shadow-sm`}
                                    >
                                        {badge.name}
                                    </span>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all flex items-center gap-3 w-full justify-center shadow-md hover:shadow-lg"
                            >
                                Start Certification
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Badge Display */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden"
                >
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full opacity-10"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-3 text-gray-800">Achievement Badges</h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                Earn recognition for your food safety expertise with our exclusive badge system
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {badges.map((badge) => (
                                <motion.div
                                    key={badge.id}
                                    variants={badgeVariants}
                                    whileHover="hover"
                                    className="text-center p-6 hover:bg-gray-50 rounded-xl transition-all border border-gray-100 hover:border-gray-200 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10">
                                        <div className="w-24 h-24 mx-auto mb-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl shadow-lg group-hover:shadow-xl transition-shadow">
                                            {badge.icon}
                                        </div>
                                        <h4 className="font-bold text-lg text-gray-800 mb-2">{badge.name}</h4>
                                        <p className="text-sm text-gray-500">{badge.description}</p>
                                        <div className="mt-4">
                                            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">
                                                {badge.points} pts
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready to demonstrate your food safety commitment?</h3>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
                    >
                        Begin Your Certification Journey
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

const badges = [
    { id: 1, name: 'Food Handler', icon: '🍴', description: 'Mastered basic safety protocols', points: 100 },
    { id: 2, name: 'Allergy Expert', icon: '⚠️', description: 'Certified in allergen management', points: 150 },
    { id: 3, name: 'Culinary Pro', icon: '👨‍🍳', description: 'Advanced food preparation', points: 200 },
    { id: 4, name: 'Sustainability Leader', icon: '🌱', description: 'Eco-friendly practices', points: 175 },
];

export default FoodSafety;