import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { axiosSecure } from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Spinner from '../../LoadingSpinner/Spiner';
import toast from 'react-hot-toast';

const CheckOutForm = ({ price, setShowModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [isCardComplete, setIsCardComplete] = useState(false);

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post("/create-payment-intent", { amount: price * 100 })
                .then((res) => setClientSecret(res.data.clientSecret))
                .catch((err) => {
                    toast.error("Failed to initialize payment");
                    console.error(err);
                });
        }
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            toast.error("Payment system not ready");
            return;
        }

        setLoading(true);

        try {
            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
                throw new Error("Card element not found");
            }

            const { error: paymentMethodError } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (paymentMethodError) {
                throw paymentMethodError;
            }

            const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        email: user?.email || "anonymous@example.com",
                        name: user?.displayName || "Anonymous Customer"
                    }
                }
            });

            if (paymentError) {
                throw paymentError;
            }

            if (paymentIntent.status === "succeeded") {
                //  payment data  
                const paymentData = {
                    id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,  
                    date: new Date().toISOString().split('T')[0],  
                    amount: price,  
                    method: 'Card',  
                    status: 'completed',
                    orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,  
                    transactionId: paymentIntent.id, 
                    customerEmail: user?.email || "guest@example.com"
                };
 
                toast.success("Payment successful!");

                //  Save to database 
                try {
                    await axiosSecure.post('/payments', paymentData);
                    toast.success("Payment  saved!");
                } catch (error) {
                    console.error("Failed to save payment:", error);
                    toast.error("Payment succeeded but record failed to save");
                }

                // 3. Close modal after delay
                setTimeout(() => setShowModal(false), 1500);
            }
        } catch (err) {
            toast.error(err.message || "Payment failed");
            console.error("Payment error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!clientSecret) return <Spinner />;



    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="border rounded-lg p-3">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    onChange={(e) => setIsCardComplete(e.complete)}
                />
            </div>

            <div className="flex justify-center gap-4 mt-6 px-10">
                <button
                    className={`btn btn-primary btn-sm  ${!isCardComplete || loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    type="submit"
                    disabled={!stripe || !isCardComplete || loading}
                >
                    {loading ? 'Processing...' : `Pay $${price.toFixed(2)}`}
                </button>

                <button
                    onClick={() => setShowModal(false)}
                    className="btn btn-ghost btn-sm "
                    type="button"
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CheckOutForm;