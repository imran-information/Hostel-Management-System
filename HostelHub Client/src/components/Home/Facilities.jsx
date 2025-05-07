import SectionHeader from "../../pages/shared/SectionHeader/SectionHeader";
import { FaBed, FaWifi, FaTshirt, FaShieldAlt } from 'react-icons/fa';

const Facilities = () => {
    const facilities = [
        {
            title: "Modern Rooms",
            icon: <FaBed size={24} />,
            desc: "AC rooms with attached bathrooms",
            iconBg: "bg-indigo-100 text-indigo-600"
        },
        {
            title: "Study Lounge",
            icon: <FaWifi size={24} />,
            desc: "24/7 access with high-speed WiFi",
            iconBg: "bg-blue-100 text-blue-600"
        },
        {
            title: "Laundry Service",
            icon: <FaTshirt size={24} />,
            desc: "Weekly laundry included",
            iconBg: "bg-green-100 text-green-600"
        },
        {
            title: "Security",
            icon: <FaShieldAlt size={24} />,
            desc: "CCTV surveillance & biometric access",
            iconBg: "bg-amber-100 text-amber-600"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-t from-white to-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Our Premium Facilities"
                    subtitle="Designed for your comfort and convenience"
                />

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {facilities.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 transform hover:-translate-y-1 p-6"
                        >
                            <div className={`w-14 h-14 flex items-center justify-center rounded-xl mb-4 ${item.iconBg}`}>
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-14 text-center">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                        View All Facilities
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Facilities;
