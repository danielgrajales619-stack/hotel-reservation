import { Router } from "express";
import reservationRoutes from "./hotelReservation/reservationRoutes.js";
import usersRoutes from "./users/userRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const routes = Router()

routes.use('/reservation', authMiddleware, reservationRoutes)
routes.use('/users', usersRoutes)

export default routes

