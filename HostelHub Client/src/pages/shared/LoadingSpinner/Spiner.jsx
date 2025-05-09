const Spinner = () => (
    <div className="flex justify-center space-x-2 h-16 items-center">
        {[...Array(5)].map((_, i) => (
            <div
                key={i}
                className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
            />
        ))}
    </div>
);

export default Spinner 