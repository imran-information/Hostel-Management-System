import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../../assets/hostel/1.jpg';
import img2 from '../../assets/hostel/2.jpg';
import img3 from '../../assets/hostel/3.jpg';
import img4 from '../../assets/hostel/4.jpg';
import img5 from '../../assets/hostel/5.jpg';
import img6 from '../../assets/hostel/6.jpg';
import img7 from '../../assets/hostel/7.jpg';
import img8 from '../../assets/hostel/8.jpg';
import SectionHeader from '../../pages/shared/SectionHeader/SectionHeader';

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loaded, setLoaded] = useState(Array(images.length).fill(false));

    const handleImageLoad = (index) => {
        setLoaded(prev => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
        });
    };

    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title="Our Hostel Gallery"
                    subtitle="Take a look at the heart of our community"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            className="group relative overflow-hidden rounded-xl aspect-square"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {!loaded[index] && (
                                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
                            )}
                            <motion.img
                                src={img}
                                alt={`Hostel ${index + 1}`}
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{
                                    opacity: loaded[index] ? 1 : 0,
                                    scale: loaded[index] ? 1 : 1.05
                                }}
                                transition={{ duration: 0.5 }}
                                onLoad={() => handleImageLoad(index)}
                                loading="lazy"
                            />
                            <motion.div
                                className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.button
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    View
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                className="relative max-w-6xl w-full"
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <motion.img
                                    src={selectedImage}
                                    alt="Enlarged view"
                                    className="w-full max-h-[90vh] object-contain rounded-lg shadow-xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                />
                                <motion.button
                                    className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSelectedImage(null)}
                                    aria-label="Close"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Gallery;