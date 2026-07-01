import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectToDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import CarRouter from "./routes/carRoutes.js";


const app = express();

app.use(express.json());

app.use('/api/auth', authRouter)

app.use('/api/car', CarRouter)

connectToDB();

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT),
);
