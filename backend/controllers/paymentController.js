import stripe from "../config/stripe.js";
import Booking from "../models/Booking.js";

export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, bookingId, currency = "inr" } = req.body;

        if (!amount || !bookingId) {
            return res.status(400).json({
                message: "Amount and booking ID are required",
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents/paise
            currency: currency.toLowerCase(),
            metadata: {
                bookingId: bookingId,
            },
        });

        return res.status(200).json({
            message: "Payment intent created successfully",
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        console.error("Payment intent error:", error);
        return res.status(500).json({
            message: "Failed to create payment intent",
            error: error.message,
        });
    }
};

export const confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId, bookingId } = req.body;

        if (!paymentIntentId || !bookingId) {
            return res.status(400).json({
                message: "Payment intent ID and booking ID are required",
            });
        }

        // Retrieve the payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);


        if (paymentIntent.status === "succeeded") {
            // Update booking status to completed/paid
            const booking = await Booking.findById(bookingId);

            return res.status(200).json({
                message: "Payment confirmed successfully",
                booking,
                paymentStatus: paymentIntent.status,
            });
        } else if (paymentIntent.status === "processing") {
            return res.status(200).json({
                message: "Payment is processing",
                paymentStatus: paymentIntent.status,
            });
        } else {
            return res.status(400).json({
                message: "Payment failed",
                paymentStatus: paymentIntent.status,
            });
        }
    } catch (error) {
        console.error("Confirm payment error:", error);
        return res.status(500).json({
            message: "Failed to confirm payment",
            error: error.message,
        });
    }
};

export const getPaymentStatus = async (req, res) => {
    try {
        const { paymentIntentId } = req.params;

        if (!paymentIntentId) {
            return res.status(400).json({
                message: "Payment intent ID is required",
            });
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        return res.status(200).json({
            message: "Payment status retrieved",
            paymentStatus: paymentIntent.status,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        console.error("Get payment status error:", error);
        return res.status(500).json({
            message: "Failed to get payment status",
            error: error.message,
        });
    }
};
