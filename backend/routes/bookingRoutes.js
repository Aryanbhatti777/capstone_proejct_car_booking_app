import { Router } from "express";
import { createBooking, getBookings, getUserBookings, updateBookingStatus } from "../controllers/bookingController.js";

const BookingRouter = Router();

BookingRouter.post('/book/:id', createBooking)

BookingRouter.get('/bookings', getBookings)

BookingRouter.get('/userBookings/:id', getUserBookings)

BookingRouter.put('/updateBookingStatus/:id', updateBookingStatus)


export default BookingRouter;