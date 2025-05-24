import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Button from '../../pages/shared/Button/Button';
import { ArrowUpRightFromSquare } from 'lucide-react'; 

const Banner = () => {
    const slides = [
        {
            id: 1,
            title: "Delicious Meals, Anytime",
            subtitle: "Enjoy fresh, home-style cooking prepared by our expert chefs",
            image: "https://images.unsplash.com/photo-1641232340210-db39a5ca2806?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "View Today's Menu",
            link: "/meals",
            badge: "Chef's Special",
            ctaText: "Order Now"
        },
        {
            id: 2,
            title: "Premium Membership Plans",
            subtitle: "Unlock exclusive benefits including priority booking and special menus",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
            category: "Explore Plans",
            link: "#membership-plans",
            badge: "Popular",
            ctaText: "Join Now"
        },
        {
            id: 3,
            title: "Comfortable Living Spaces",
            subtitle: "Modern rooms designed for productivity and relaxation",
            image: "https://images.unsplash.com/photo-1653204280036-c272f16ec7ed?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Book Now",
            link: "/dashboard/my-requests",
            badge: "Limited Availability",
            ctaText: "View Rooms"
        },
        {
            id: 4,
            title: "24/7 Student Support",
            subtitle: "Dedicated assistance for all your hostel needs",
            image: "https://images.unsplash.com/photo-1610208385141-601c7503eb10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Get Help",
            link: "/about",
            badge: "New Service",
            ctaText: "Contact Us"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto slide functionality
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <div className="relative w-full  h-[400px] sm:h-[500px] md:h-[600px] lg:h-screen overflow-hidden">
            {/* Slides */}
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-opacity-40"></div>
                        </div>

                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 text-white">
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-oswald font-bold mb-4 animate-fadeInUp">
                                {slide.title}
                            </h1>
                            <p className="text-xl sm:text-2xl mb-8 max-w-2xl animate-fadeInUp delay-100 font-poppins">
                                {slide.subtitle}
                            </p>
                            {slide.id === 2 ? (  
                                <Button
                                    to={slide.link} 
                                    variant="primary"
                                    size="large"
                                    icon={<ArrowUpRightFromSquare />}
                                    iconPosition="right"
                                >
                                    Join Now
                                </Button>
                            ) : (
                                <Button
                                    to={slide.link}
                                    size='large'
                                    iconPosition='right'
                                    icon={<ArrowUpRightFromSquare />}
                                >
                                    {slide.category}
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
                aria-label="Previous slide"
            >
                <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
                aria-label="Next slide"
            >
                <FaChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Banner