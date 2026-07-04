# Stripe Payment Integration Guide

## Setup Instructions

### Backend Setup

1. **Install Stripe Package**
   ```bash
   cd backend
   npm install stripe
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env` (if not already done)
   - Add your Stripe test keys:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   ```

3. **Get Stripe Test Keys**
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy your Secret Key (starts with `sk_test_`)
   - Copy your Publishable Key (starts with `pk_test_`)

### Frontend Setup

The frontend is already configured to use the Payment page.

## Test Card Numbers

Use these test card numbers to test the payment flow:

### Successful Payment
- **Card Number:** 4242 4242 4242 4242
- **Expiry:** Any future date (e.g., 12/25)
- **CVV:** Any 3 digits (e.g., 123)

### Payment Declined
- **Card Number:** 4000 0000 0000 0002
- **Expiry:** Any future date
- **CVV:** Any 3 digits

## Payment Flow

1. User selects a car and chooses rental dates
2. Click "Proceed to Payment" to create a booking
3. User is redirected to the Payment page
4. Enter card details using test card numbers above
5. Click "Pay ₹{amount}" to process payment
6. On successful payment:
   - Booking status is updated to "completed"
   - User is redirected to "My Bookings"
   - Booking appears with completed status

## API Endpoints

### Create Payment Intent
```
POST /api/payment/create-payment-intent
Body: {
  "amount": 1000,
  "bookingId": "booking_id_here",
  "currency": "inr"
}
```

### Confirm Payment
```
POST /api/payment/confirm-payment
Body: {
  "paymentIntentId": "pi_xxxxx",
  "bookingId": "booking_id_here"
}
```

### Get Payment Status
```
GET /api/payment/payment-status/:paymentIntentId
```

## Important Notes

- This is a **test mode integration** - no real charges will be made
- The payment form accepts formatted input for card details
- Card validation is performed on the frontend before sending to backend
- In production, use Stripe.js library for secure payment processing
- Store your Secret Key safely and never expose it on the frontend

## Troubleshooting

### "STRIPE_SECRET_KEY is not defined"
- Make sure you've added `STRIPE_SECRET_KEY` to your `.env` file
- Restart the backend server after adding the key

### Payment Intent Creation Fails
- Check that the Stripe Secret Key is correct
- Verify the amount is a positive number
- Ensure bookingId exists in the database

### Test Cards Not Working
- Make sure your Stripe account is in Test Mode
- Use the exact card numbers provided above
- Check that expiry date is in the future
