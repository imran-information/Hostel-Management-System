import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionHeader = ({ title, subtitle, start, }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
        rootMargin: '-50px 0px',
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`${start ? 'text-start' : 'text-center'} px-4 md:px-0 sm:px-6 mb-8 sm:mb-10 md:mb-12 lg:mb-14 `}
        >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 font-oswald">
                {title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed sm:leading-loose">
                {subtitle}
            </p>
        </motion.div>
    );
};

export default SectionHeader;