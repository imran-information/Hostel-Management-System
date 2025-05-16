import { FaTrophy, FaCalendarAlt, FaUpload, FaHeart, FaRegHeart, FaUser, FaStar, FaRegStar } from 'react-icons/fa';
import { GiCookingPot } from 'react-icons/gi';
import { motion } from 'framer-motion';
import Button from '../shared/Button/Button';

const CookingChallenge = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-black py-24 text-white"
            >
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="inline-block mb-6"
                    >
                        <GiCookingPot className="text-7xl mx-auto" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight font-oswald"
                    >
                        Monthly Cooking Challenge
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                    >
                        Showcase your culinary creativity and compete for exclusive prizes
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="mt-10"
                    >
                        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                            <FaCalendarAlt className="text-purple-200" />
                            <span className="font-medium">New challenge starts June 1st</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Current Challenge */}
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden mb-20 flex flex-col md:flex-row border border-gray-100"
                >
                    <div className="md:w-1/2 h-80 md:h-auto relative group">
                        <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                            alt="Seasonal vegetables arranged beautifully on a table"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <div className="flex items-center gap-2 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    i < 4 ? (
                                        <FaStar key={i} className="text-yellow-400 text-sm" />
                                    ) : (
                                        <FaRegStar key={i} className="text-yellow-400 text-sm" />
                                    )
                                ))}
                                <span className="text-white text-sm ml-1">4.2</span>
                            </div>
                            <h3 className="text-white font-semibold text-xl font-oswald">Featured Submission</h3>
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8 md:p-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium tracking-wide">
                                Current Challenge
                            </span>
                            <span className="flex items-center text-gray-500 text-sm">
                                <FaCalendarAlt className="mr-2 text-indigo-400" /> Ends in 5 days
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-5 leading-tight font-oswald">Mystery Basket: Seasonal Vegetables</h2>
                        <p className="text-gray-600 mb-7 leading-relaxed">
                            Create an innovative dish using at least 3 seasonal vegetables from your local market.
                            Bonus points for creativity and presentation! Submissions will be judged on:
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-7">
                            <div className="bg-indigo-50 p-3 rounded-lg">
                                <div className="text-indigo-600 font-medium mb-1">Taste (40%)</div>
                                <div className="h-1.5 bg-indigo-100 rounded-full">
                                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '40%' }}></div>
                                </div>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                                <div className="text-purple-600 font-medium mb-1">Creativity (30%)</div>
                                <div className="h-1.5 bg-purple-100 rounded-full">
                                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                            </div>
                            <div className="bg-amber-50 p-3 rounded-lg">
                                <div className="text-amber-600 font-medium mb-1">Presentation (20%)</div>
                                <div className="h-1.5 bg-amber-100 rounded-full">
                                    <div className="h-full bg-amber-600 rounded-full" style={{ width: '20%' }}></div>
                                </div>
                            </div>
                            <div className="bg-emerald-50 p-3 rounded-lg">
                                <div className="text-emerald-600 font-medium mb-1">Ingredients (10%)</div>
                                <div className="h-1.5 bg-emerald-100 rounded-full">
                                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '10%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="font-semibold mb-3 text-gray-800 flex items-center">
                                <FaTrophy className="text-amber-500 mr-2" /> Prizes:
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 text-sm font-medium">1</span>
                                    <div>
                                        <span className="font-medium">$200 Cash Prize</span>
                                        <p className="text-gray-500 text-sm">Plus featured on our homepage and social media</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 bg-gray-100 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 text-sm font-medium">2</span>
                                    <div>
                                        <span className="font-medium">$100 Cooking Store Credit</span>
                                        <p className="text-gray-500 text-sm">Redeemable at our partner stores</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 bg-amber-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 text-sm font-medium">3</span>
                                    <div>
                                        <span className="font-medium">Premium Membership</span>
                                        <p className="text-gray-500 text-sm">3 months of exclusive content and features</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <Button size='large' className='w-full' icon={<FaUpload />}>Submit Your Entry</Button>
                            <button className="text-indigo-600 font-medium hover:text-indigo-800 transition text-sm w-full text-center group">
                                <span className="group-hover:underline">View Full Challenge Guidelines</span>
                                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Gallery Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="mb-24"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3 text-gray-800 font-oswald">Community Submissions</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Discover inspiring creations from our talented community members
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {submissions.map((submission) => (
                            <motion.div
                                key={submission.id}
                                variants={fadeInUp}
                                whileHover={{
                                    y: -8,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                                }}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
                            >
                                <div className="relative h-64 overflow-hidden group">
                                    <img
                                        src={submission.image}
                                        alt={`${submission.title} by ${submission.user}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition hover:scale-110 shadow-sm">
                                        {submission.liked ? (
                                            <FaHeart className="text-red-500 text-lg" />
                                        ) : (
                                            <FaRegHeart className="text-gray-600 hover:text-red-500 text-lg" />
                                        )}
                                    </button>
                                    {submission.id === 1 && (
                                        <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                                            FEATURED
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{submission.title}</h3>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 overflow-hidden">
                                            <img
                                                src={`https://i.pravatar.cc/150?img=${submission.id}`}
                                                alt={submission.user}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span>{submission.user}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center">
                                            <FaHeart className="text-red-500 mr-2" /> {submission.likes} likes
                                        </span>
                                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition flex items-center group">
                                            View Recipe
                                            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12 flex justify-center"> 
                        <Button size='large' to='/about' isOutlet variant='outline'>Load More Submissions</Button>

                    </div>
                </motion.div>

                {/* Previous Challenges */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3 text-gray-800 font-oswald">Previous Challenges</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Explore our archive of past culinary adventures
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {challenges.map((challenge) => (
                            <motion.div
                                key={challenge.id}
                                variants={fadeInUp}
                                whileHover={{
                                    y: -8,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                                }}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
                            >
                                <div className="relative h-48 overflow-hidden group">
                                    <img
                                        src={challenge.image}
                                        alt={challenge.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white rounded-full text-xs font-medium">
                                        {challenge.date}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{challenge.title}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-sm">{challenge.participants} participants</span>
                                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition flex items-center group">
                                            View Winners
                                            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const submissions = [
    {
        id: 1,
        title: "Rainbow Veggie Tart with Herb Infusion",
        user: "ChefMaria",
        likes: 142,
        liked: false,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    },
    {
        id: 2,
        title: "Harvest Ratatouille with Balsamic Glaze",
        user: "VeggieMaster",
        likes: 98,
        liked: true,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 3,
        title: "Autumn Root Vegetable Bake with Crispy Sage",
        user: "FarmToTable",
        likes: 76,
        liked: false,
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 4,
        title: "Garden Fresh Stir Fry with Ginger Soy Sauce",
        user: "WokThisWay",
        likes: 112,
        liked: false,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 5,
        title: "Vegetable Wellington with Mushroom Duxelles",
        user: "PastryPro",
        likes: 154,
        liked: false,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 6,
        title: "Farmers Market Pasta Primavera",
        user: "ItalianChef",
        likes: 87,
        liked: false,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1232&q=80",
    },
];

const challenges = [
    {
        id: 1,
        title: "One-Pot Wonders Challenge",
        date: "May 2023",
        participants: "342",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 2,
        title: "Breakfast Revolution Challenge",
        date: "April 2023",
        participants: "289",
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=749&q=80",
    },
    {
        id: 3,
        title: "Comfort Food Makeover Challenge",
        date: "March 2023",
        participants: "412",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    },
];

export default CookingChallenge;