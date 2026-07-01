import Car from "../models/Car.js";

export const AddCar = async (req, res) => {
    try {
        const {
            name,
            brand,
            model,
            year,
            pricePerDay,
            fuelType,
            transmission,
            seats,
            available,
        } = req.body;

        if (
            !name ||
            !brand ||
            !model ||
            !year ||
            !pricePerDay ||
            !fuelType ||
            !transmission ||
            !seats ||
            !available
        ) {
            return res.status(400).json({
                message: "All fields required",
            });
        }

        const newCar = await Car.create({
            name,
            brand,
            model,
            year,
            pricePerDay,
            fuelType,
            transmission,
            seats,
            available,
        });

        return res.status(201).json({
            message: "Car added sucessfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getCars = async (req, res) => {
    try {
        const cars = await Car.find();

        return res.status(200).json({
            cars,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getCar = async (req, res) => {
    try {
        const id = req.params.id;

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({
                message: "Car not found",
            });
        }

        return res.status(200).json({
            car,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const id = req.params.id;

        await Car.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Car deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const updateCar = async (req, res) => {
    try {
        const id = req.params.id;

        const {name, brand, model, year, pricePerDay, fuelType, transmission, seats, available} = req.body;

        if (!name || !brand || !model || !year || !pricePerDay || !fuelType || !transmission || !seats || !available
        ) {
            return res.status(400).json({
                message: "All fields required",
            });
        }

        const updatedCar = {
            name: req.body.name ,
            brand: req.body.brand ,
            model : req.body.model ,
            year: req.body.year ,
            pricePerDay: req.body.pricePerDay ,
            fuelType: req.body.fuelType ,
            transmission: req.body.transmission ,
            seats: req.body.seats ,
            available: req.body.available 
        };

        const car = await Car.findByIdAndUpdate(id, updatedCar, {
            new: true,
        });

        if (!car) {
            return res.status(404).json({
                message: "Car not found",
            });
        }

        return res.status(200).json({
            car
        });
        
    } catch (error) {

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
