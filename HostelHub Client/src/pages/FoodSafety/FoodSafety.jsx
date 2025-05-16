import { FaCertificate, FaShieldAlt, FaClipboardCheck, FaDownload, FaPlayCircle } from 'react-icons/fa';
import { GiCook } from 'react-icons/gi';
import { motion } from 'framer-motion';
import Button from '../shared/Button/Button';
import { ListStart } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader/SectionHeader';

const FoodSafety = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cardHover = {
        hover: {
            y: -10,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-black overflow-hidden">
                {/* Floating decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                x: [0, Math.random() * 100 - 50],
                                y: [0, Math.random() * 100 - 50],
                                rotate: [0, Math.random() * 360]
                            }}
                            transition={{
                                duration: 20 + Math.random() * 20,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "linear"
                            }}
                            className="absolute w-8 h-8 rounded-full bg-white"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${20 + Math.random() * 40}px`,
                                height: `${20 + Math.random() * 40}px`
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 relative z-10 py-5">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mb-4"
                    >
                        <div className="w-30 h-30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <FaCertificate className="text-4xl text-white" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-center"
                    >
                        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-4 font-oswald">
                            Food Safety Excellence
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-xl text-indigo-100 max-w-2xl mx-auto">
                            Our commitment to the highest standards of food safety and hygiene
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {/* Features Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
                    >
                        {/* Hygiene Card */}
                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            variants={cardHover}
                            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col"
                        >
                            <div className="p-8 flex-grow">
                                <div className="w-16 h-16 bg-indigo-50 rounded-lg flex items-center justify-center mb-6">
                                    <FaShieldAlt className="text-2xl text-indigo-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Hygiene Guidelines</h3>
                                <ul className="space-y-3 text-gray-600 mb-6">
                                    {[
                                        "Hand washing protocols",
                                        "Safe food temperatures",
                                        "Cross-contamination prevention",
                                        "Proper storage techniques",
                                        "Sanitization procedures"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-6">
                                <Button className='w-full' size='large' icon={<FaDownload />}>Download Guidelines</Button>
                            </div>
                        </motion.div>

                        {/* Training Card */}
                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            variants={cardHover}
                            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col"
                        >
                            <div className="p-8 flex-grow">
                                <div className="w-16 h-16 bg-indigo-50 rounded-lg flex items-center justify-center mb-6">
                                    <GiCook className="text-2xl text-indigo-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Training</h3>

                                <div className="relative rounded-lg overflow-hidden mb-6 bg-gray-100 aspect-video flex items-center justify-center">
                                    <div className="absolute inset-0 bg-indigo-600 opacity-90"></div>
                                    <div className="relative z-10 text-center p-4">
                                        <FaPlayCircle className="text-4xl text-white mx-auto mb-3" />
                                        <h4 className="text-white font-medium text-lg">Food Handling Masterclass</h4>
                                        <p className="text-teal-100 text-sm mt-1">15 min tutorial</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <Button className='w-full' size='large' icon={<FaPlayCircle />}>Browse All Courses</Button>
                            </div>
                        </motion.div>

                        {/* Certification Card */}
                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            variants={cardHover}
                            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col"
                        >
                            <div className="p-8 flex-grow">
                                <div className="w-16 h-16 bg-indigo-50 rounded-lg flex items-center justify-center mb-6">
                                    <FaClipboardCheck className="text-2xl text-indigo-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get Certified</h3>
                                <p className="text-gray-600 mb-6">
                                    Complete our comprehensive food safety program and showcase your certification badges.
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {['Basic', 'Advanced', 'Professional', 'Allergen', 'Eco'].map((level, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                                        >
                                            {level}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6">
                                <Button className='w-full' size='large' icon={<ListStart />}>Start Certification</Button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Badges Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl shadow-md p-8 mb-16"
                    > 
                        <SectionHeader title={"Achievement Badges"} subtitle={" Earn recognition for your food safety expertise with our exclusive badge system"}/> 

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { id: 1, name: 'Food Handler', icon: '🍴', description: 'Mastered basic safety protocols', points: 100 },
                                { id: 2, name: 'Allergy Expert', icon: '⚠️', description: 'Certified in allergen management', points: 150 },
                                { id: 3, name: 'Culinary Pro', icon: '👨‍🍳', description: 'Advanced food preparation', points: 200 },
                                { id: 4, name: 'Sustainability Leader', icon: '🌱', description: 'Eco-friendly practices', points: 175 },
                            ].map((badge) => (
                                <motion.div
                                    key={badge.id}
                                    whileHover={{ y: -5 }}
                                    className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200 hover:border-indigo-200 transition-colors"
                                >
                                    <div className="w-20 h-20 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-3xl">
                                        {badge.icon}
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-800 mb-2">{badge.name}</h4>
                                    <p className="text-sm text-gray-500 mb-3">{badge.description}</p>
                                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">
                                        {badge.points} pts
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* CTA Section */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center"
                    > 
                        <SectionHeader title={"Ready to demonstrate your food safety commitment?"} subtitle={"Join thousands of professionals who have elevated their food safety standards with our certification program."}/> 

                        <div className="flex justify-center">
                            <Button size='large'>Begin Your Certification Journey</Button>
                        </div>
                    </motion.section>
                </div>
            </section>
        </div>
    );
};

export default FoodSafety;