import { FaCertificate, FaShieldAlt, FaClipboardCheck, FaDownload, FaPlayCircle } from 'react-icons/fa';
import { GiCook } from 'react-icons/gi';
import { motion } from 'framer-motion';

const FoodSafety = () => {

    const badgeVariants = {
        hover: {
            y: -5,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-20 text-white"
            >
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <FaCertificate className="text-5xl mx-auto mb-4" />
                    </motion.div>
                    <h1 className="text-4xl font-bold mb-4">Food Safety Certification</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        Ensuring safe and hygienic meal sharing for our community
                    </p>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Guidelines Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Hygiene Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                        <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                            <FaShieldAlt className="text-2xl text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Hygiene Guidelines</h3>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                <span>Hand washing protocols</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                <span>Safe food temperatures</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                <span>Cross-contamination prevention</span>
                            </li>
                        </ul>
                        <button className="mt-6 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2 w-full justify-center">
                            <FaDownload />
                            Download PDF
                        </button>
                    </motion.div>

                    {/* Tutorials Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                        <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                            <GiCook className="text-2xl text-teal-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Food Handling Tutorials</h3>
                        <div className="relative rounded-lg overflow-hidden mb-4 bg-gray-100 aspect-video">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaPlayCircle className="text-4xl text-indigo-600 opacity-80" />
                            </div>
                        </div>
                        <button className="px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2 w-full justify-center">
                            <FaPlayCircle />
                            View All Videos
                        </button>
                    </motion.div>

                    {/* Certification Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <FaClipboardCheck className="text-2xl text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Get Certified</h3>
                        <p className="text-gray-600 mb-4">
                            Complete our food safety course and earn badges to show on your profile
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium border border-yellow-200">Basic</span>
                            <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200">Advanced</span>
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">Pro</span>
                        </div>
                        <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2 w-full justify-center">
                            Start Certification
                        </button>
                    </motion.div>
                </div>

                {/* Badge Display */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                >
                    <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Certification Badges</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {badges.map((badge) => (
                            <motion.div
                                key={badge.id}
                                variants={badgeVariants}
                                whileHover="hover"
                                className="text-center p-5 hover:bg-gray-50 rounded-xl transition-all border border-gray-100"
                            >
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl shadow-md">
                                    {badge.icon}
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-1">{badge.name}</h4>
                                <p className="text-sm text-gray-500">{badge.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const badges = [
    { id: 1, name: 'Food Handler', icon: '🍴', description: 'Basic safety certification' },
    { id: 2, name: 'Allergy Aware', icon: '⚠️', description: 'Allergen management' },
    { id: 3, name: 'Master Chef', icon: '👨‍🍳', description: 'Advanced food prep' },
    { id: 4, name: 'Eco Warrior', icon: '🌱', description: 'Sustainable practices' },
];

export default FoodSafety;