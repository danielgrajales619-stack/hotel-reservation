import { Router } from "express";
import validatorHandler from "../../middlewares/validatorHandler.js";
import { createUserSchema, updateUserSchema, getUserSchema } from "../../schemas/userSchema.js";
import { deleteUserById, getAllUsers, getUserById, loginUser, registerUser, updateDataUser } from "../../controllers/userControllers.js";

const usersRoutes = Router()

usersRoutes.get('/', getAllUsers)

usersRoutes.get('/:id', validatorHandler(getUserSchema, 'params'), getUserById)

usersRoutes.post('/register', validatorHandler(createUserSchema, 'body'), registerUser)

usersRoutes.post('/login', loginUser)

usersRoutes.put('/:id', validatorHandler(getUserSchema, "params"), validatorHandler(updateUserSchema, "body"), updateDataUser)

usersRoutes.delete('/:id', deleteUserById)

export default usersRoutes