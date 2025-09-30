import Joi from "joi";

const name = Joi.string().max(20);
const lastName = Joi.string().max(20);
const age = Joi.number().integer().min(18);
const roomNumber = Joi.number().integer().min(1);
const id = Joi.string();
const reservationDay = Joi.string();
const userId = Joi.string();
const invitedUsers = Joi.array().items(Joi.string());

const createReservationSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    age: age.required(),
    roomNumber: roomNumber.required(),
    reservationDay: reservationDay.required()
});

const updateReservationSchema = Joi.object({
    name,
    lastName,
    age,
    roomNumber,
    reservationDay,
    userId: userId.optional()
});  

const invitedReservationSchema = Joi.object({
    invitedUsers: invitedUsers.required()
});

const getReservationSchema = Joi.object({
    id: id.required()
});

export {
    createReservationSchema,
    updateReservationSchema,
    invitedReservationSchema,
    getReservationSchema
};
