import { useState } from 'react';
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

    return (
        <section className="py-16 bg-blue-50">
            <div className="container mx-auto px-4">
                <SectionHeader title="Our Hostel Gallery" subtitle="Take a look at the heart of our community" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-xl h-64">
                            <img
                                src={img}
                                alt={`Hostel ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <button
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-full"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative max-w-7xl w-full p-4">
                            <img src={selectedImage} alt="Enlarged view" className="w-full rounded-lg shadow-lg" />
                            <button
                                className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-1"
                                onClick={() => setSelectedImage(null)}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Gallery;
