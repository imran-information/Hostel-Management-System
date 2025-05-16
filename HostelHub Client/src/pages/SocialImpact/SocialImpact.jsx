import { FaLeaf, FaRecycle, FaHandsHelping, FaGlobeAmericas } from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

const SocialImpact = () => {
    const stats = [
        {
            value: '12,845',
            label: 'Meals Shared',
            icon: <FaHandsHelping className="text-2xl" />,
            color: 'from-indigo-500 to-indigo-600',
            description: 'Nutritious meals shared within our community'
        },
        {
            value: '3,429',
            label: 'Meals Donated',
            icon: <FaHandsHelping className="text-2xl" />,
            color: 'from-green-500 to-green-600',
            description: 'Meals provided to those in need'
        },
        {
            value: '8.2 Tons',
            label: 'Food Waste Prevented',
            icon: <FaRecycle className="text-2xl" />,
            color: 'from-teal-500 to-teal-600',
            description: 'Reducing environmental impact'
        },
        {
            value: '1,203',
            label: 'Community Members',
            icon: <RiTeamFill className="text-2xl" />,
            color: 'from-purple-500 to-purple-600',
            description: 'Active participants in our program'
        },
    ];

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
        show: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative py-20 md:py-28 text-white overflow-hidden"
            >
                <div className="absolute inset-0 bg-black">
                    <motion.div
                        animate={{
                            x: [0, 30, 0],
                            y: [0, 40, 0],
                            rotate: [0, 10, 0]
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-500 opacity-10"
                    />
                    <motion.div
                        animate={{
                            x: [0, -40, 0],
                            y: [0, 30, 0],
                            rotate: [0, -15, 0]
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: 3
                        }}
                        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-purple-500 opacity-10"
                    />
                </div>

                <div className="relative container mx-auto px-4 text-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="inline-block mb-6 md:mb-8"
                    >
                        <FaLeaf className="text-5xl md:text-7xl text-white drop-shadow-lg" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white drop-shadow-md leading-tight font-oswald"
                    >
                        Creating Meaningful Impact
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl max-w-3xl mx-auto px-4"
                    >
                        How we're building stronger communities through shared meals and sustainability
                    </motion.p>
                </div>
            </motion.div>

            {/* Stats Section */}
            <div className="container mx-auto px-4 py-12 md:py-16 ">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={container}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ y: -8 }}
                            className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group"
                        >
                            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                            <div className="relative z-10">
                                <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${stat.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-white mx-auto`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">{stat.value}</h3>
                                <p className="text-center font-medium text-gray-700 mb-2 md:mb-3">{stat.label}</p>
                                <p className="text-center text-sm text-gray-500 leading-relaxed">{stat.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Impact Stories */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-20"
                >
                    <div className="text-center mb-8 md:mb-12 px-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Community Impact Stories</h2>
                        <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto">
                            Real stories of how we're making a difference together
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {stories.map((story) => (
                            <motion.div
                                key={story.id}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="relative overflow-hidden h-48 md:h-60">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                                <div className="p-5 md:p-6">
                                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">{story.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4 md:mb-5 leading-relaxed">{story.excerpt}</p>
                                    <button className="text-indigo-600 font-medium hover:underline flex items-center gap-2 text-sm md:text-base">
                                        Read Full Story
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Interactive Map */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden mb-16 md:mb-20"
                >
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100 rounded-full opacity-10"></div>
                    <div className="relative z-10">
                        <div className="text-center mb-8 md:mb-10">
                            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl md:rounded-2xl mb-4 md:mb-5 mx-auto">
                                <FaGlobeAmericas className="text-2xl md:text-3xl text-indigo-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">Our Global Reach</h2>
                            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto px-4">
                                See how our impact extends across communities worldwide
                            </p>
                        </div>

                        <div className="h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg md:rounded-xl flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
                            <FaGlobeAmericas className="text-4xl md:text-5xl mb-3 md:mb-4 opacity-50" />
                            <p className="text-sm md:text-base">Interactive impact map visualization</p>
                            <p className="text-xs md:text-sm mt-1 md:mt-2">(Would show locations of meal sharing impact)</p>
                        </div>

                        <div className="flex justify-center mt-6 md:mt-8">
                            <button className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg md:rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm md:text-base">
                                Explore Our Global Impact
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 md:mt-20 text-center px-4"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Ready to make a difference?</h3>
                    <p className="text-lg md:text-xl text-gray-500 mb-6 md:mb-8 max-w-3xl mx-auto">
                        Join our community of meal sharers and help create positive change
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg md:rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-base md:text-lg font-semibold"
                    >
                        Get Involved Today
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

const stories = [
    {
        id: 1,
        title: "Feeding Families in Need",
        excerpt: "How our community provided 500 meals to local shelters during the holiday season",
        image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        title: "Zero Waste Kitchen Initiative",
        excerpt: "Innovative ways our chefs reduce food waste while creating delicious meals",
        image: "https://images.unsplash.com/photo-1628372802463-5e4fa01b2428?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        title: "Volunteers Making an Impact",
        excerpt: "Community members team up for our most successful food drive yet",
        image: "https://images.unsplash.com/photo-1628717341663-0007b0ee2597?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

export default SocialImpact;