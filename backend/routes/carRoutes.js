import { Router } from "express";
import { AddCar, deleteCar, getCar, getCars, updateCar } from "../controllers/carController.js";

const CarRouter = Router();

CarRouter.post('/addcar', AddCar);

CarRouter.get('/getcars', getCars);

CarRouter.get('/getcar/:id', getCar);

CarRouter.put('/updatecar/:id', updateCar)

CarRouter.delete('/deletecar/:id', deleteCar);

export default CarRouter;