import { Router } from "express";
import validatorHandler from "../../middlewares/validatorHandler.js";
import { createReservationSchema, updateReservationSchema, getReservationSchema , invitedReservationSchema } from "../../schemas/hotelreservationSchema.js";
import { createReservation, deleteReservation, getReservations, getReservationById, updateReservation , invitedUsersReservation} from "../../controllers/reservationControlles.js";

const reservationRoutes = Router()

reservationRoutes.post('/create', validatorHandler(createReservationSchema , 'body'), createReservation)
reservationRoutes.get('/', getReservations)
reservationRoutes.get('/:id', validatorHandler(getReservationSchema, 'params'), getReservationById)
reservationRoutes.put('/:id', validatorHandler(getReservationSchema, "params"), validatorHandler(updateReservationSchema, 'body'), updateReservation)
reservationRoutes.put('/invite/:id' , validatorHandler( invitedReservationSchema, 'body') , invitedUsersReservation)
reservationRoutes.delete('/:id', deleteReservation)


export default reservationRoutes