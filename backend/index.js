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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(express.static(path.join(__dirname, "dist")));

app.use('/api/auth', authRouter)

app.use('/api/car', CarRouter)

app.use('/api/booking', BookingRouter)

app.use('/api/payment', PaymentRouter)

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
  // If using 'build' folder instead of 'dist', change above to:
  // res.sendFile(path.join(__dirname, "build", "index.html"));
});

connectToDB();

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT),
);
