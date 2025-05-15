const ReviewForm = ({ mealId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const submitReview = async () => {
        await axios.post('/reviews', {
            mealId,
            rating,
            comment,
            studentId: currentUser.id
        });
        // Refresh data
    };

    return (
        <div className="mt-4 p-3 bg-gray-50 rounded">
            <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                        ★
                    </button>
                ))}
            </div>
            <textarea
                className="w-full p-2 border rounded mb-2"
                placeholder="Your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                onClick={submitReview}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Submit Review
            </button>
        </div>
    );
};