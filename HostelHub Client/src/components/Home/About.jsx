import { Link } from 'react-router';
import aboutImg from '../../assets/hostel/hostel.jpg'

const About = () => {
    return (
        <section className="container mx-auto flex flex-col md:flex-row items-center gap-10  my-12 rounded-2xl bg-[#f2f2f2]">
            {/* Left Side Image */}
            <div className="w-full md:w-1/2">
                <img
                    src={aboutImg}
                    alt="Hotel Hub Overview"
                    className="w-full h-1/5 object-cover rounded-2xl shadow-lg"
                />
            </div>


            {/* Right Side Content */}
            <div className="w-full md:w-1/2 text-center px-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 ">About HostelHub</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                    <br /><br />
                    At Hotel Master, we offer more than just hospitality — we craft an experience where every detail is designed for your peace and pleasure.
                    Nestled in tranquility, our location is a sanctuary for the soul, created to bring bliss and balance to your life.
                    <br /><br />
                    Come and discover a destination where comfort meets charm, and relaxation becomes a way of life.
                </p>
                <Link to='/'>
                    <button className="cursor-pointer flex-1  mt-4 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded text-center transition-colors">
                        Check More Details
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default About;