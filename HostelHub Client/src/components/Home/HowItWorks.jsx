import { motion } from 'framer-motion';
import SectionHeader from "../../pages/shared/SectionHeader/SectionHeader";
import { FaUserEdit, FaUtensils, FaCreditCard, FaSmile } from 'react-icons/fa';
import Button from '../../pages/shared/Button/Button';

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaUserEdit className="text-indigo-600" size={24} />,
            title: "Register Account",
            desc: "Create your student profile in minutes",
            color: "bg-indigo-50"
        },
        {
            icon: <FaUtensils className="text-indigo-600" size={24} />,
            title: "Select Meal Plan",
            desc: "Choose from our diverse dining options",
            color: "bg-indigo-50"
        },
        {
            icon: <FaCreditCard className="text-indigo-600" size={24} />,
            title: "Secure Payment",
            desc: "Complete with our encrypted checkout",
            color: "bg-indigo-50"
        },
        {
            icon: <FaSmile className="text-indigo-600" size={24} />,
            title: "Enjoy Experience",
            desc: "Access premium hostel facilities",
            color: "bg-indigo-50"
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
                ease: [0.16, 1, 0.3, 1] // Custom easing curve
            }
        },
        hover: {
            y: -8,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
        }
    };

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-0">
                <SectionHeader
                    title="How It Works"
                    subtitle="Simple steps to get started with our hostel services"
                />

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover="hover"
                            className="bg-white p-6 sm:p-7 rounded-xl shadow-xs hover:shadow-sm transition-all will-change-transform"
                        >
                            <div className="flex flex-col items-center text-center h-full">
                                <div className={`mb-4 p-3 ${step.color} rounded-full shadow-xs`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 flex-grow">
                                    {step.desc}
                                </p>
                                <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full">
                                    Step {index + 1}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.8,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="mt-14 sm:mt-16 lg:mt-20 flex justify-center"
                >
                    <Button size='large'>Get Started Today</Button>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;