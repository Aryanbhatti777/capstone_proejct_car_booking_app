import { Router } from "express";
import {
  createPaymentIntent,
  confirmPayment,
  getPaymentStatus,
} from "../controllers/paymentController.js";

const PaymentRouter = Router();

PaymentRouter.post("/create-payment-intent", createPaymentIntent);

PaymentRouter.post("/confirm-payment", confirmPayment);

PaymentRouter.get("/payment-status/:paymentIntentId", getPaymentStatus);

export default PaymentRouter;
