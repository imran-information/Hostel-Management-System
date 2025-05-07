import React from 'react';
import { useParallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import img from '../../assets/hostel/hostel.jpg';

const CTA = () => {
    const { ref } = useParallax({
        speed: -10,
    });

    return (
        <section className="relative py-32 overflow-hidden text-white">
            {/* Parallax Background Image - Fixed Approach */}
            <div
                ref={ref}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    willChange: 'transform',
                    zIndex: -1,
                    backgroundImage: `url(${img})` // Correct way to use dynamic image
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 text-center relative">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-6"
                >
                    Ready to Experience Premium Hostel Life?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
                >
                    Join hundreds of satisfied students enjoying our facilities
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Book Your Stay Now
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300">
                        Take Virtual Tour
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;