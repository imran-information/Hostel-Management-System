import CountUp from 'react-countup';

const StatsCounter = () => {
    const stats = [
        { number: 500, label: 'Happy Students', suffix: '+' },
        { number: 50, label: 'Daily Meals', suffix: '+' },
        { number: 24, label: 'Hour Support', suffix: '/7' },
        { number: 4.9, label: 'Average Rating', suffix: '/5' }
    ];

    return (
        <section className="py-16 bg-indigo-600 text-white my-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold mb-2">
                            <CountUp end={stat.number} duration={2} decimals={stat.number % 1 !== 0 ? 1 : 0} />
                            <span>{stat.suffix}</span>
                        </h3>
                        <p className="text-sm font-medium uppercase tracking-widest opacity-90">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsCounter;
