# 🚗 Car Booking App

A full-stack car rental/booking platform built with the **MERN stack** (MongoDB, Express, React, Node.js). Users can browse available cars, book them for specific dates, and complete payment through a test payment gateway. Admins have a dedicated dashboard to manage cars and bookings.

**Live Demo:** https://capstone-proejct-car-booking-app.vercel.app/

---

## ✨ Features

### User
- 🔐 Register and log in to a personal account
- 🔍 Browse and search available cars
- 📅 Book a car for selected dates
- 💳 Complete payment via a test-mode payment gateway
- 📖 View all personal bookings under "My Bookings"
- ❌ Cancel an existing booking

### Admin
- ➕ Add new cars to the fleet
- 🗑️ Delete existing cars
- 📋 View all bookings made by users
- ✅ Update booking status (Completed / Cancelled)

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|------------------------------------|
| Frontend   | React.js                          |
| Backend    | Node.js, Express.js                |
| Database   | MongoDB                            |
| Auth       | JWT-based authentication           |
| Payments   | Payment gateway integration (test mode) |
| Deployment | Vercel (frontend), *your backend host* |

---

## ⚙️ How It Works

1. **Sign up / Log in** — Users create an account or log into an existing one.
2. **Browse Cars** — Explore the list of available cars with details like model, price, and availability.
3. **Book a Car** — Select booking dates for a chosen car.
4. **Payment** — Complete the booking through a test-mode payment flow.
5. **Confirmation** — On successful payment, the booking is saved and appears under "My Bookings."
6. **Manage Bookings** — Users can cancel a booking; admins can mark bookings as *Completed* or *Cancelled*.
7. **Admin Controls** — Admins manage the car inventory (add/delete cars) and oversee all bookings from a separate dashboard.

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd car-booking-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the backend directory with the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYMENT_GATEWAY_KEY=your_test_api_key
```

### Running the App

```bash
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm start
```

---

## 📌 Project Status

This is a capstone project built to demonstrate full-stack development skills using the MERN stack, including authentication, role-based access (user/admin), booking workflows, and payment integration.

---

## 📄 License

This project is open source and available for learning purposes.
