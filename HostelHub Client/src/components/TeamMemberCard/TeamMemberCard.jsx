import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const TeamMemberCard = ({ member }) => {
    return (
        <motion.div
            whileHover={{ 
                y: -8,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
        >
            <div className="relative h-64 overflow-hidden group">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
            </div>
            
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                        <p className="text-amber-600 font-medium">{member.role}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        {member.social.twitter && (
                            <a 
                                href={member.social.twitter} 
                                className="text-gray-400 hover:text-amber-600 transition-colors"
                                aria-label={`${member.name}'s Twitter`}
                            >
                                <FaTwitter className="text-lg" />
                            </a>
                        )}
                        {member.social.instagram && (
                            <a 
                                href={member.social.instagram} 
                                className="text-gray-400 hover:text-amber-600 transition-colors"
                                aria-label={`${member.name}'s Instagram`}
                            >
                                <FaInstagram className="text-lg" />
                            </a>
                        )}
                        {member.social.linkedin && (
                            <a 
                                href={member.social.linkedin} 
                                className="text-gray-400 hover:text-amber-600 transition-colors"
                                aria-label={`${member.name}'s LinkedIn`}
                            >
                                <FaLinkedin className="text-lg" />
                            </a>
                        )}
                    </div>
                </div>
                
                <p className="text-gray-600 mb-5">{member.bio}</p>
                
                <div className="flex flex-wrap gap-2">
                    {member.skills?.map((skill, index) => (
                        <span 
                            key={index}
                            className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default TeamMemberCard;