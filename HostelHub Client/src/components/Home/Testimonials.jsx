const testimonials = [
    {
        name: "Rahim Khan",
        role: "CSE Student",
        quote: "The meal plans saved me so much time for studies!",
        video: "/testimonials/student1.mp4"
    },
    // ... more testimonials
];

const Testimonials = () => (
    <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <video
                            src={testimonial.video}
                            controls
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Testimonials