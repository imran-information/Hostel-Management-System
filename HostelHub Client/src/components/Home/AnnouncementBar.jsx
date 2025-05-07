import { useState } from 'react';
import { X } from 'lucide-react'; // Optional: use lucide-react or any icon lib

const AnnouncementBar = () => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="bg-indigo-800 text-white flex justify-between items-center py-2 px-4 ">
            <div className=""></div>
            <p className="text-sm font-medium text-center">
                🎉 Special Offer: Get 15% off on Gold Membership for first 100 students!
            </p>
            <button
                onClick={() => setVisible(false)}
                className="text-white hover:text-gray-300"
                aria-label="Close announcement"
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default AnnouncementBar;
