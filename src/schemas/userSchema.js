import Joi from "joi";

const id = Joi.string()
const password = Joi.string().min(5)
const email = Joi.string().email()
const role = Joi.string()
const name = Joi.string()
const lastName = Joi.string()
const age = Joi.number()



const username = Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .min(3)
    .max(20)
    .required()

const createUserSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required(),
    username: username.required(),
    age: age.required(),
    role: role.optional()
})

const updateUserSchema = Joi.object({
    id,
    role: role.optional(),
    
})

const getUserSchema = Joi.object({
    id: id.required()
})

export {
    createUserSchema,
    updateUserSchema,
    getUserSchema
}