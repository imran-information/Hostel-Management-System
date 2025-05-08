import { FaTrophy, FaCalendarAlt, FaUpload } from 'react-icons/fa';
import { GiCookingPot } from 'react-icons/gi';

const CookingChallenge = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <GiCookingPot className="text-6xl mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-4">Monthly Cooking Challenge</h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Test your skills, get inspired, and win prizes!
                    </p>
                </div>
            </div>

            {/* Current Challenge */}
            <div className="container mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-20 flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-80 md:h-auto">
                        <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                            alt="Challenge Ingredient"
                            className="w-full h-full object-cover"
                        />
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
                            Bonus points for creativity and presentation!
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

                        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center">
                            <FaUpload className="mr-2" /> Submit Your Entry
                        </button>
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Community Submissions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {submissions.map((submission) => (
                            <div key={submission.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                                <img src={submission.image} alt={submission.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-1 text-gray-800">{submission.title}</h3>
                                    <p className="text-gray-500 text-sm mb-3">by {submission.user}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                            {submission.likes} likes
                                        </span>
                                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
                                            Vote Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Previous Challenges */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Previous Challenges</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {challenges.map((challenge) => (
                            <div key={challenge.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                <img src={challenge.image} alt={challenge.title} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-800 mb-1">{challenge.title}</h3>
                                    <p className="text-gray-500 text-sm mb-2">{challenge.date}</p>
                                    <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
                                        View Winners →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    },
    // Add more submissions...
];

const challenges = [
    {
        id: 1,
        title: "One-Pot Wonders",
        date: "May 2023",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    },
    // Add more challenges...
];

export default CookingChallenge;
