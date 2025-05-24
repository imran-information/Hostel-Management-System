import { Link } from 'react-router-dom';
import aboutImg from '../../assets/hostel/hostel.jpg';
import Button from '../../pages/shared/Button/Button';
import SectionHeader from '../../pages/shared/SectionHeader/SectionHeader';

const About = () => {
    return (
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-4 lg:px-0">
                <div className="flex flex-col lg:flex-row items-center gap-0 lg:gap-12 xl:gap-16 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                    {/* Left Side Image with Decorative Element */}
                    <div className="w-full lg:w-1/2 h-full relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent z-10" />
                        <img
                            src={aboutImg}
                            alt="HostelHub Overview"
                            className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-600 rounded-full opacity-20 blur-xl" />
                    </div>

                    {/* Right Side Content */}
                    <div className="w-full lg:w-1/2 p-8 sm:p-10 lg:p-12 xl:p-14 relative">
                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-100 rounded-full opacity-30 blur-xl" />
                        <div className="absolute bottom-10 left-10 w-16 h-16 bg-indigo-200 rounded-full opacity-20 blur-lg" />
                        
                        <div className="relative z-20">
                            <SectionHeader 
                                start 
                                title='About HostelHub' 
                                subtitle='Where Comfort Meets Community' 
                                className="mb-6"
                            />
                            
                            <div className="space-y-5 md:space-y-6">
                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed sm:leading-loose font-light">
                                    At HostelHub, we've redefined student living with spaces designed to inspire and comfort. Our philosophy blends modern convenience with a warm, community-focused environment.
                                </p>
                                
                                <div className="pl-4 border-l-4 border-indigo-200">
                                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed sm:leading-loose">
                                        <span className="font-medium text-indigo-600">Premium Amenities:</span> High-speed WiFi, study lounges, and modern kitchens in every unit.
                                    </p>
                                </div>
                                
                                <div className="pl-4 border-l-4 border-indigo-200">
                                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed sm:leading-loose">
                                        <span className="font-medium text-indigo-600">Vibrant Community:</span> Regular social events and shared spaces designed to foster connections.
                                    </p>
                                </div>
                                
                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed sm:leading-loose font-light">
                                    Discover why students choose HostelHub as their home away from home - where every detail is crafted for your academic success and personal growth.
                                </p>
                            </div>
                            
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Button 
                                    to='/about' 
                                    variant='primary'
                                    className="shadow-lg shadow-indigo-100 hover:shadow-indigo-200"
                                >
                                    Explore Our Spaces
                                </Button>
                                <Button 
                                    to='/social-impact' 
                                    variant='outline'
                                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                                >
                                    Schedule a Tour
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </section>
    );
};

export default About;