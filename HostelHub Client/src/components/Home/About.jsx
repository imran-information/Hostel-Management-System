import { Link } from 'react-router-dom';
import aboutImg from '../../assets/hostel/hostel.jpg';
import Button from '../../pages/shared/Button/Button';
import SectionHeader from '../../pages/shared/SectionHeader/SectionHeader';

const About = () => {
    return (
        <section className="bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-8 sm:py-12 lg:py-16">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16 bg-white rounded-2xl overflow-hidden shadow-md">
                    {/* Left Side Image */}
                    <div className="w-full lg:w-1/2 h-full">
                        <img
                            src={aboutImg}
                            alt="HostelHub Overview"
                            className="w-full h-auto sm:h-64 md:h-80 rounded-2xl lg:h-full object-cover "
                        />
                    </div>

                    {/* Right Side Content */}
                    <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 xl:p-12 ">
                        <SectionHeader start title='About HostelHub' />
                        <div className="space-y-4 md:space-y-6 ">
                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed sm:leading-loose">
                                A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                            </p>
                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed sm:leading-loose">
                                At HostelHub, we offer more than just accommodation — we craft an experience where every detail is designed for your peace and pleasure.
                                Nestled in tranquility, our location is a sanctuary for students, created to bring comfort and convenience to your academic life.
                            </p>
                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed sm:leading-loose">
                                Come and discover a home where comfort meets community, and student life becomes truly enjoyable.
                            </p>
                        </div>
                        <div className="mt-6 sm:mt-8 md:mt-10">
                            <Button to='/about' isOutlet variant='outline'>Check More Details</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default About;