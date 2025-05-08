import { useParallax } from "react-scroll-parallax";
import img from '../../assets/hostel/hostel.jpg';
import { motion } from 'framer-motion';
import Button from "../../pages/shared/Button/Button";

const Testimonials = () => {
    const parallax = useParallax({
        speed: -10,
        shouldAlwaysCompleteAnimation: true,
        disabled: window.innerWidth < 768 // Disable parallax on mobile
    });

    return (
        <section className="relative py-20 md:py-32 overflow-hidden text-white">
            {/* Background Image with Fallback for Mobile */}
            <div
                ref={parallax.ref}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: `url(${img})`,
                    zIndex: -1,
                    transform: window.innerWidth >= 768 ? parallax.transform : 'none'
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 sm:px-6 text-center relative">
                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-oswald"
                >
                    Ready to Experience Premium Hostel Life?
                </motion.h2>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                    Join hundreds of satisfied students enjoying our facilities.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
                >
                    <button className="w-full sm:w-auto bg-white text-indigo-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
                        Book Your Stay Now
                    </button>
                    <button className="w-full sm:w-auto border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300 active:scale-95">
                        Take Virtual Tour
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;