import { motion } from 'framer-motion';
import { FaCrown, FaStar, FaCheck } from 'react-icons/fa';
import SectionHeader from '../../pages/shared/SectionHeader/SectionHeader';

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        hover: {
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
        }
    };

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Membership Plans"
                    subtitle="Choose the perfect plan for your hostel dining experience"
                />

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover="hover"
                            className={`relative rounded-xl overflow-hidden transition-all will-change-transform ${plan.popular
                                ? 'border-2 border-yellow-400 shadow-lg'
                                : 'border border-gray-200 shadow-md hover:shadow-lg'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-800 px-3 py-1 text-xs font-bold rounded-bl-lg z-10">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="p-6 sm:p-7">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                                    <span className="text-2xl">{plan.icon}</span>
                                </div>

                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                                    <span className="text-gray-500 text-sm">/{plan.duration}</span>
                                </div>

                                <ul className="space-y-3 mb-8 ">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <FaCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                            <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all font-oswald ${plan.popular
                                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-800'
                                        : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white'
                                        }`}
                                >
                                    Get Started
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default MembershipPlans;