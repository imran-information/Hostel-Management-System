import SectionHeader from "../../pages/shared/SectionHeader/SectionHeader";
import { FaBed, FaWifi, FaTshirt, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Button from "../../pages/shared/Button/Button";

const Facilities = () => {
    const facilities = [
        {
            title: "Modern Rooms",
            icon: <FaBed size={24} />,
            desc: "AC rooms with attached bathrooms",
            iconBg: "bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600"
        },
        {
            title: "Study Lounge",
            icon: <FaWifi size={24} />,
            desc: "24/7 access with high-speed WiFi",
            iconBg: "bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600"
        },
        {
            title: "Laundry Service",
            icon: <FaTshirt size={24} />,
            desc: "Weekly laundry included",
            iconBg: "bg-gradient-to-br from-green-100 to-green-50 text-green-600"
        },
        {
            title: "Security",
            icon: <FaShieldAlt size={24} />,
            desc: "CCTV surveillance & biometric access",
            iconBg: "bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600"
        }
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
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Our Premium Facilities"
                    subtitle="Designed for your comfort and convenience"
                />

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {facilities.map((itemData, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 overflow-hidden relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className={`w-14 h-14 flex items-center justify-center rounded-xl mb-4 ${itemData.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                                {itemData.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 relative z-10">
                                {itemData.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                                {itemData.desc}
                            </p>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-indigo-500 transition-all duration-500"></div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-14 flex justify-center"
                >

                    <Button size='large'>View All Facilities</Button>
                </motion.div>
            </div>
        </section>
    );
};

export default Facilities;