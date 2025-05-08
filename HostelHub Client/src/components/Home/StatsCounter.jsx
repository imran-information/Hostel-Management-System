import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsCounter = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const stats = [
        { number: 5000, label: 'Happy Students', suffix: '+' },
        { number: 500, label: 'Daily Meals', suffix: '+' },
        { number: 24, label: 'Hour Support', suffix: '/7' },
        { number: 4.9, label: 'Average Rating', suffix: '/5' }
    ];

    return (
        <section ref={ref} className="py-12 sm:py-16 lg:py-20 bg-black text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center p-4 sm:p-6">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
                                {inView && (
                                    <CountUp
                                        end={stat.number}
                                        duration={2.5}
                                        decimals={stat.number % 1 !== 0 ? 1 : 0}
                                        separator=","
                                    />
                                )}
                                <span className="text-2xl sm:text-3xl md:text-4xl">{stat.suffix}</span>
                            </h3>
                            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider opacity-90">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;