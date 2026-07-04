import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import { calculatePrice } from "../utils/calculatePrice.js";


export const createBooking = async (req, res) => {

    try {

        const id = req.params.id

        const { user, car, pickupDate, returnDate, totalPrice } = req.body;

        if (!user || !pickupDate || !returnDate) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingBooking = await Booking.findOne({ car: id, status: "booked" });

        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);

        if (returnD <= pickup) {
            return res.status(400).json({
                message: "Return date must be after pickup date"
            });
        }

        const carFP = await Car.findById(id);

        const totalPriceFP = calculatePrice(carFP, pickupDate, returnDate);


        if (existingBooking) {
            return res.status(400).json({
                message: "Car is already booked for the selected dates"
            })
        }

        const newBooking = await Booking.create({
            user,
            car: id,
            pickupDate,
            returnDate,
            totalPrice: totalPriceFP,
            status: "booked"
        })

        return res.status(201).json({
            message: "Car booked successfully",
            booking: newBooking
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error creating booking",
            error: error.message
        })
    }
}

export const getBookings = async (req, res) => {

    try{

        const bookings = await Booking.find().populate('user').populate('car');

        return res.status(200).json({
            message: "Bookings retrieved successfully",
            bookings
        })
    }catch (error){

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const getUserBookings = async (req,res) => {

    try {

        const id = req.params.id;

        const bookings = await Booking.find({user: id}).populate('car').populate('user');

        if(!bookings){

            return res.status(404).json({
                message: "No bookings found"
            })
        }

        return res.status(200).json({
            message: "Bookings retrieved successfully",
            bookings
        })

    } catch (error) {
        
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const updateBookingStatus = async (req,res) => {

    const id = req.params.id;

    try{

        const booking = await Booking.findById(id);

        if(!booking){
            return res.status(404).json({
                message: "Booking not found"
            })
        }

        booking.status = req.body.status;

        await booking.save();

        return res.status(200).json({
            message: "Booking status updated successfully",
            booking
        })

    }catch (error){

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}