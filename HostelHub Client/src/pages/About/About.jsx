import { FaAward, FaUsers, FaUtensils, FaHeart, FaLeaf } from 'react-icons/fa';
import { GiChefToque, GiCookingPot } from 'react-icons/gi';
import { motion } from 'framer-motion'; 
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';
import Button from '../shared/Button/Button';

const About = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring",
                damping: 10,
                stiffness: 100
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const teamMembers = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Founder & Head Judge",
            bio: "Former executive chef with 15 years experience in Michelin-starred restaurants.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
            social: {
                twitter: "#",
                instagram: "#",
                linkedin: "#"
            }
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Community Manager",
            bio: "Food blogger with a passion for bringing cooks together through challenges.",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            social: {
                twitter: "#",
                instagram: "#",
                linkedin: "#"
            }
        },
        {
            id: 3,
            name: "Elena Rodriguez",
            role: "Marketing Director",
            bio: "Digital marketing specialist with a love for food photography.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            social: {
                twitter: "#",
                instagram: "#",
                linkedin: "#"
            }
        }
    ];

    const stats = [
        { value: "10,000+", label: "Community Members", icon: <FaUsers className="text-3xl" /> },
        { value: "250+", label: "Monthly Submissions", icon: <FaUtensils className="text-3xl" /> },
        { value: "36", label: "Challenges Completed", icon: <GiCookingPot className="text-3xl" /> },
        { value: "15", label: "Countries Represented", icon: <FaLeaf className="text-3xl" /> }
    ];

    return (
        <div className="min-h-screen bg-gray-50 ">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-black py-28 text-white"
            >
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                            duration: 1.8, 
                            repeat: Infinity, 
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="inline-block mb-6"
                    >
                        <GiChefToque className="text-7xl mx-auto" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight font-oswald"
                    >
                        Our Culinary Journey
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                    >
                        Bringing cooks together through creative challenges since 2018
                    </motion.p>
                </div>
            </motion.div>

            {/* Our Story */}
            <div className="container mx-auto px-4 py-20 ">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="flex flex-col lg:flex-row gap-12 items-center"
                >
                    <motion.div variants={fadeInUp} className="lg:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl h-96 lg:h-[500px]">
                            <img
                                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
                                alt="Chefs working together in kitchen"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 text-white ">
                                <div className="flex items-center gap-2">
                                    <FaHeart className="text-indigo-400" />
                                    <span>Our founding team in 2018</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div variants={fadeInUp} className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 font-oswald">Our Story</h2>
                        <div className="space-y-5 text-gray-600 leading-relaxed">
                            <p>
                                What began as a small cooking competition among friends has blossomed into a vibrant global community of culinary enthusiasts. Founded in 2018 by professional chef Sarah Johnson, our platform was created to inspire creativity in home cooks and professionals alike.
                            </p>
                            <p>
                                We believe that cooking challenges push boundaries, foster innovation, and create connections between people from all walks of life. Each month, we design challenges that encourage participants to think outside the recipe box while developing their technical skills.
                            </p>
                            <p>
                                Today, we're proud to host one of the most engaged cooking communities online, with members from over 15 countries sharing their creations and supporting each other's culinary journeys.
                            </p>
                        </div>
                        
                        <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                            <div className="flex items-start gap-4">
                                <FaAward className="text-indigo-600 text-2xl mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-2">Our Mission</h3>
                                    <p className="text-gray-600">
                                        To inspire culinary creativity, build confidence in the kitchen, and connect cooks worldwide through fun, accessible challenges that celebrate diverse food cultures.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="bg-indigo-100 py-20">
                <div className="container mx-auto px-4 ">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div 
                                key={index}
                                variants={fadeInUp}
                                className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow"
                            >
                                <div className="text-indigo-600 mb-4 flex justify-center">
                                    {stat.icon}
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                                <p className="text-gray-500">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Team Section */}
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <div className="text-center mb-16">
                        <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-4 font-oswald">
                            Meet Our Team
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-gray-500 max-w-2xl mx-auto text-lg">
                            The passionate food lovers behind the challenges
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member) => (
                            <TeamMemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Values Section */}
            <div className="bg-indigo-50 py-20">
                <div className="container mx-auto px-4  ">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <div className="text-center mb-16">
                            <motion.h2 variants={fadeInUp} className="text-3xl font-bold  mb-4 font-oswald">
                                Our Core Values
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="  mx-auto text-lg">
                                The principles that guide everything we do
                            </motion.p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div 
                                variants={fadeInUp}
                                className="bg-white p-8 rounded-xl shadow-lg"
                            >
                                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                                    <GiChefToque className="text-indigo-600 text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Culinary Excellence</h3>
                                <p className="text-gray-600">
                                    We celebrate skill development and technical mastery while making gourmet techniques accessible to all.
                                </p>
                            </motion.div>
                            
                            <motion.div 
                                variants={fadeInUp}
                                className="bg-white p-8 rounded-xl shadow-lg"
                            >
                                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                                    <FaUsers className="text-indigo-600 text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Community First</h3>
                                <p className="text-gray-600">
                                    Our platform thrives on mutual support, constructive feedback, and shared passion for cooking.
                                </p>
                            </motion.div>
                            
                            <motion.div 
                                variants={fadeInUp}
                                className="bg-white p-8 rounded-xl shadow-lg"
                            >
                                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                                    <FaLeaf className="text-indigo-600 text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Sustainable Practices</h3>
                                <p className="text-gray-600">
                                    We promote responsible sourcing, seasonal cooking, and minimizing food waste in all our challenges.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-20 ">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="bg-indigo-50 rounded-2xl p-12 text-center  shadow-xl"
                >
                    <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4 font-oswald">
                        Ready to Join the Challenge?
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-xl mb-8  max-w-2xl mx-auto">
                        Whether you're a seasoned chef or just starting out, there's a place for you in our community.
                    </motion.p>
                    <motion.div className='flex justify-center' variants={fadeInUp}> 
                        <Button size='large'>Join Now - It's Free</Button>
                    </motion.div>
                </motion.div> 
            </div>
        </div>
    );
};

export default About;