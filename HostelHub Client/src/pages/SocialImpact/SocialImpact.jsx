import { FaLeaf, FaRecycle, FaHandsHelping } from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';

const SocialImpact = () => {
    const stats = [
        { value: '12,845', label: 'Meals Shared', icon: <FaHandsHelping className="text-4xl" />, color: 'text-indigo-600' },
        { value: '3,429', label: 'Meals Donated', icon: <FaHandsHelping className="text-4xl" />, color: 'text-green-500' },
        { value: '8.2 Tons', label: 'Food Waste Prevented', icon: <FaRecycle className="text-4xl" />, color: 'text-teal-500' },
        { value: '1,203', label: 'Community Members', icon: <RiTeamFill className="text-4xl" />, color: 'text-purple-500' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-20 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <FaLeaf className="text-6xl mb-4 mx-auto animate-pulse" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Social Impact</h1>
                    <p className="text-lg md:text-xl opacity-90">
                        Together we're making a difference in our communities
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
                            <div className={`${stat.color} mb-4`}>{stat.icon}</div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Impact Stories */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Community Impact Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stories.map((story) => (
                            <div key={story.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                                <img src={story.image} alt={story.title} className="w-full h-52 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{story.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{story.excerpt}</p>
                                    <button className="text-indigo-600 font-medium hover:underline">Read Full Story →</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Map */}
                <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Our Global Impact</h2>
                    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                        Interactive map visualization
                    </div>
                </div>
            </div>
        </div>
    );
};

const stories = [
    {
        id: 1,
        title: "Feeding Families in Need",
        excerpt: "How our community provided 500 meals to local shelters",
        image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf",
    },
    {
        id: 2,
        title: "Zero Waste Kitchen",
        excerpt: "Innovative ways our chefs reduce waste daily",
        image: "https://images.unsplash.com/photo-1589927986089-35812388d1a3",
    },
    {
        id: 3,
        title: "Volunteers Unite",
        excerpt: "Community members team up for food drive success",
        image: "https://images.unsplash.com/photo-1609838464285-39a9ef4c7c0c",
    },
];

export default SocialImpact;
