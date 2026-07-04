import "dotenv/config";

import express from "express";
import cors from "cors";
import { connectToDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import CarRouter from "./routes/carRoutes.js";
import BookingRouter from "./routes/bookingRoutes.js";
import PaymentRouter from "./routes/paymentRoutes.js";


const app = express();

app.use(express.json());

const allowedOrigin = [
  "https://capstone-proejct-car-booking-app.vercel.app"
];
app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin || allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use('/api/auth', authRouter)

app.use('/api/car', CarRouter)

app.use('/api/booking', BookingRouter)

app.use('/api/payment', PaymentRouter)

connectToDB();

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT),
);
