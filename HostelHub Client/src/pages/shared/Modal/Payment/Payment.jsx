import { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import SectionHeader from "../../SectionHeader/SectionHeader";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_stripe_publishable_key);

const Payment = ({ price, showModal, setShowModal }) => {
    if (!showModal) return null;


    const cardNumbers = [
        '5105105105105100',
        '5200828282828210',
        '2223003122003222',
        '5555555555554444',
        '4242424242424242'
    ];

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("Copy successful!");
            })
            .catch(err => {
                console.log('Failed to copy: ', err);
            });
    };

    return (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="payment-modal-title"
            >
                <div className="p-6 relative">
                    {/* Close button (top-right corner) */}
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close payment modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <SectionHeader
                        title="Payment"
                        subtitle="Please complete your payment"
                        id="payment-modal-title"  // Connect to aria-labelledby
                    />

                    <div className="space-y-2">
                        <h3 className="font-medium text-gray-700">Test Card Numbers:</h3>
                        <ul className="space-y-1">
                            {cardNumbers.map((number, index) => (
                                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                    <span className="font-mono">{number}</span>
                                    <button
                                        onClick={() => copyToClipboard(number)}
                                        className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200 transition"
                                    >
                                        Copy
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">
                            Use any future date for expiry and any 3 digits for CVC
                        </p>
                    </div>

                    <div className="mt-4">
                        <Elements stripe={stripePromise}>
                            <CheckOutForm
                                price={price}
                                setShowModal={setShowModal}
                                onSuccess={() => setShowModal(false)}
                            />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;