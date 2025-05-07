const MealCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
            {/* Image Skeleton */}
            <div className="h-48 bg-gray-200"></div>

            {/* Content Skeleton */}
            <div className="p-4">
                <div className="flex justify-between mb-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/6"></div>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>

                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>

                <div className="mt-4 h-10 bg-gray-200 rounded"></div>
                <div className="mt-2 h-10 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default MealCardSkeleton;