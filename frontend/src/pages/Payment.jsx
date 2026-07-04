import React, { useState, useContext, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { createPaymentIntent, confirmPayment } from "../services/paymentService";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import "../assets/styles/payment.css";

const Payment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);

    const bookingData = location.state?.bookingData;
    const totalPrice = location.state?.totalPrice;
    const bookingId = location.state?.bookingId;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!bookingData || !totalPrice) {
            navigate(`/booking/${id}`);
        }
    }, []);


    const handlePayment = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            if (!stripe || !elements) {
                setError("Stripe is not loaded.");
                return;
            }

            const intentResponse = await createPaymentIntent(totalPrice, bookingId);

            const { clientSecret } = intentResponse.data;

            const { error: stripeError, paymentIntent } =
                await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                });

            if (stripeError) {
                setError(stripeError.message);
                return;
            }

            const confirmResponse = await confirmPayment(
                paymentIntent.id,
                bookingId
            );

            if (confirmResponse.status === 200) {
                setSuccess(true);

                setTimeout(() => {
                    alert("Payment Successful!");
                    navigate("/my-bookings");
                }, 1500);
            }
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Payment processing failed."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!bookingData) return <Loader />;

    return (
        <div className="payment-page">
            <div className="payment-container">
                <div className="payment-form-section">
                    <h1>Complete Payment</h1>
                    {error && <div className="error-message">{error}</div>}
                    {success && (
                        <div className="success-message">
                            ✓ Payment Successful! Redirecting...
                        </div>
                    )}

                    <form onSubmit={handlePayment} className="payment-form">
                        <div className="form-section">
                            <h3>Booking Summary</h3>
                            <div className="booking-summary">
                                <p>
                                    <strong>Car:</strong> {bookingData.carName}
                                </p>
                                <p>
                                    <strong>Pickup:</strong> {new Date(bookingData.pickupDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Return:</strong> {new Date(bookingData.returnDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Days:</strong> {bookingData.numberOfDays}
                                </p>
                                <p className="total-price">
                                    <strong>Total Amount:</strong> ₹{totalPrice}
                                </p>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Card Details</h3>

                            <p className="test-info">
                                Use test card: <code>4242 4242 4242 4242</code><br />
                                Expiry: Any future date<br />
                                CVC: Any 3 digits
                            </p>

                            <div
                                className="form-group"
                                style={{
                                    padding: "15px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    background: "#fff",
                                    marginBottom: "20px",
                                }}
                            >
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                color: "#424770",
                                                "::placeholder": {
                                                    color: "#aab7c4",
                                                },
                                            },
                                            invalid: {
                                                color: "#9e2146",
                                            },
                                        },
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !stripe}
                                className="pay-btn"
                            >
                                {loading ? "Processing..." : `Pay ₹${totalPrice}`}
                            </button>
                        </div>

                        <div className="form-section">
                            <p className="disclaimer">
                                This is a test Stripe integration. No actual charges will be made to your card.
                            </p>
                        </div>
                    </form>

                    <button
                        onClick={() => navigate(`/booking/${id}`)}
                        className="back-btn"
                    >
                        Back to Booking
                    </button>
                </div>

                <div className="payment-info-section">
                    <h3>Payment Information</h3>
                    <div className="info-card">
                        <h4>Test Mode</h4>
                        <p>This payment gateway is in test mode for demonstration purposes.</p>
                    </div>
                    <div className="info-card">
                        <h4>Test Card Numbers</h4>
                        <ul>
                            <li>
                                <strong>Success:</strong> 4242 4242 4242 4242
                            </li>
                            <li>
                                <strong>Decline:</strong> 4000 0000 0000 0002
                            </li>
                            <li>
                                <strong>Expiry:</strong> Any future date
                            </li>
                            <li>
                                <strong>CVC:</strong> Any 3 digits
                            </li>
                        </ul>
                    </div>
                    <div className="info-card">
                        <h4>Security</h4>
                        <p>Your payment information is encrypted and secure. We use industry-standard encryption protocols.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
