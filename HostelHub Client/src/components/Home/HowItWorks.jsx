import { motion } from 'framer-motion';
import SectionHeader from "../../pages/shared/SectionHeader/SectionHeader";
import { FaUserEdit, FaUtensils, FaCreditCard, FaSmile } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaUserEdit className="text-indigo-600" size={32} />,
            title: "Register Account",
            desc: "Create your student profile in minutes",
            color: "bg-indigo-50"
        },
        {
            icon: <FaUtensils className="text-blue-600" size={32} />,
            title: "Select Meal Plan",
            desc: "Choose from our diverse dining options",
            color: "bg-blue-50"
        },
        {
            icon: <FaCreditCard className="text-green-600" size={32} />,
            title: "Secure Payment",
            desc: "Complete with our encrypted checkout",
            color: "bg-green-50"
        },
        {
            icon: <FaSmile className="text-amber-600" size={32} />,
            title: "Enjoy Experience",
            desc: "Access premium hostel facilities",
            color: "bg-amber-50"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
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

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="How It Works"
                    subtitle="Simple steps to get started with our hostel services"
                />

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className={`${step.color} p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300`}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-5 p-4 bg-white rounded-full shadow-sm">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {step.desc}
                                </p>
                                <span className="text-xs font-medium text-gray-400">
                                    Step {index + 1}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        Get Started Today
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;