import { FaCrown, FaStar, FaCheck } from 'react-icons/fa';

const MembershipPlans = () => {
    const plans = [
        {
            name: 'Basic',
            price: 0,
            duration: 'per month',
            features: [
                'Standard meals',
                'Limited meal choices',
                'Basic support'
            ],
            popular: false,
            icon: <FaStar className="text-gray-400" />
        },
        {
            name: 'Silver',
            price: 29,
            duration: 'per month',
            features: [
                '20% more meal options',
                'Priority meal requests',
                '24/7 support',
                'Weekly specials'
            ],
            popular: false,
            icon: <FaStar className="text-gray-300" />
        },
        {
            name: 'Gold',
            price: 59,
            duration: 'per month',
            features: [
                '40% more meal options',
                'Premium meal selections',
                '24/7 priority support',
                'Daily specials',
                'Early access to new meals'
            ],
            popular: true,
            icon: <FaCrown className="text-yellow-400" />
        },
        {
            name: 'Platinum',
            price: 99,
            duration: 'per month',
            features: [
                'Unlimited meal options',
                'Chef special requests',
                'VIP support',
                'Daily gourmet meals',
                'Personalized nutrition plan',
                'Exclusive events'
            ],
            popular: false,
            icon: <FaCrown className="text-purple-500" />
        }
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Membership Plans</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choose the perfect plan for your hostel dining experience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${plan.popular ? 'border-2 border-yellow-400 transform scale-105' : 'border border-gray-200'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-800 px-3 py-1 text-xs font-bold rounded-bl-lg">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                                    <span className="text-2xl">{plan.icon}</span>
                                </div>

                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                                    <span className="text-gray-500">/{plan.duration}</span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.popular
                                        ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-800'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                        }`}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MembershipPlans;