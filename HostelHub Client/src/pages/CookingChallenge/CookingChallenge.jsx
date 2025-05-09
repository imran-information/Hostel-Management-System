import { FaTrophy, FaCalendarAlt, FaUpload, FaHeart, FaRegHeart, FaUser } from 'react-icons/fa';
import { GiCookingPot } from 'react-icons/gi';
import { motion } from 'framer-motion';
// import Head from 'next/head';

const CookingChallenge = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* <Head>
                <title>Monthly Cooking Challenge | Culinary Community</title>
                <meta name="description" content="Join our monthly cooking challenge and showcase your culinary skills" />
            </Head> */}

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-white"
            >
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <GiCookingPot className="text-6xl mx-auto mb-4" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Monthly Cooking Challenge
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        Test your skills, get inspired, and win prizes!
                    </motion.p>
                </div>
            </motion.div>

            {/* Current Challenge */}
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-20 flex flex-col md:flex-row"
                >
                    <div className="md:w-1/2 h-80 md:h-auto relative">
                        <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                            alt="Seasonal vegetables arranged beautifully on a table"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <div className="md:w-1/2 p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                                Current Challenge
                            </span>
                            <span className="flex items-center text-gray-500 text-sm">
                                <FaCalendarAlt className="mr-1" /> Ends in 5 days
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Mystery Basket: Seasonal Vegetables</h2>
                        <p className="text-gray-600 mb-6">
                            Create an amazing dish using at least 3 seasonal vegetables from your local market.
                            Bonus points for creativity and presentation! Submissions will be judged on taste (40%),
                            creativity (30%), presentation (20%), and use of ingredients (10%).
                        </p>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-gray-800">Prizes:</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <FaTrophy className="text-yellow-500 mr-2" />
                                    <span>1st Place: $200 + Featured on our homepage</span>
                                </li>
                                <li className="flex items-center">
                                    <FaTrophy className="text-gray-400 mr-2" />
                                    <span>2nd Place: $100 Cooking Store Credit</span>
                                </li>
                                <li className="flex items-center">
                                    <FaTrophy className="text-amber-700 mr-2" />
                                    <span>3rd Place: Premium Membership for 3 months</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center w-full justify-center"
                            >
                                <FaUpload className="mr-2" /> Submit Your Entry
                            </motion.button>
                            <button className="text-indigo-600 font-medium hover:text-indigo-800 transition text-sm w-full text-center">
                                View Full Challenge Guidelines
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Gallery Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mb-20"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-indigo-700">Community Submissions</h2>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
                        Check out what our community has created and vote for your favorites!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {submissions.map((submission) => (
                            <motion.div
                                key={submission.id}
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={submission.image}
                                        alt={`${submission.title} by ${submission.user}`}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        loading="lazy"
                                    />
                                    <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white transition">
                                        {submission.liked ? (
                                            <FaHeart className="text-red-500" />
                                        ) : (
                                            <FaRegHeart className="text-gray-600 hover:text-red-500" />
                                        )}
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-1 text-gray-800">{submission.title}</h3>
                                    <div className="flex items-center text-gray-500 text-sm mb-3">
                                        <FaUser className="mr-1" /> {submission.user}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center">
                                            <FaHeart className="text-red-500 mr-1" /> {submission.likes} likes
                                        </span>
                                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
                                            View Recipe
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition">
                            Load More Submissions
                        </button>
                    </div>
                </motion.div>

                {/* Previous Challenges */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-indigo-700">Previous Challenges</h2>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
                        Take a look at our past challenges and get inspired for the next one!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {challenges.map((challenge) => (
                            <motion.div
                                key={challenge.id}
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={challenge.image}
                                        alt={challenge.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        loading="lazy"
                                    />
                                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white rounded-full text-xs">
                                        {challenge.date}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-800 mb-1">{challenge.title}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-sm">{challenge.participants} participants</span>
                                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition flex items-center">
                                            View Winners <span className="ml-1">→</span>
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
        title: "Rainbow Veggie Tart",
        user: "ChefMaria",
        likes: 142,
        liked: false,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    },
    {
        id: 2,
        title: "Harvest Ratatouille",
        user: "VeggieMaster",
        likes: 98,
        liked: true,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 3,
        title: "Autumn Root Bake",
        user: "FarmToTable",
        likes: 76,
        liked: false,
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 4,
        title: "Garden Fresh Stir Fry",
        user: "WokThisWay",
        likes: 112,
        liked: false,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 5,
        title: "Vegetable Wellington",
        user: "PastryPro",
        likes: 154,
        liked: false,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 6,
        title: "Farmers Market Pasta",
        user: "ItalianChef",
        likes: 87,
        liked: false,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1232&q=80",
    },
];

const challenges = [
    {
        id: 1,
        title: "One-Pot Wonders",
        date: "May 2023",
        participants: "342",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 2,
        title: "Breakfast Revolution",
        date: "April 2023",
        participants: "289",
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=749&q=80",
    },
    {
        id: 3,
        title: "Comfort Food Makeover",
        date: "March 2023",
        participants: "412",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    },
];

export default CookingChallenge;