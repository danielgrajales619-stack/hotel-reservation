import { User } from "../models/users.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res, next) => {
    try {
        const { id, username, email, password } = req.query
        const filter = {}
        if (id) filter._id = id
        if (username) filter.username = new RegExp(username, 'i')
        if (password) filter.password = password
        const getAllUsers = await User.find(filter)
        res.status(200).json(getAllUsers)
    } catch (err) {
        next(err)
    }  
}

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params
        const getUserById = await User.findById(id)
        if (getUserById == null) {
            res.status(400).json({
                message: "No se encontro su usuario por el id que ingresaste"
            })
        }
        res.status(200).json(getUserById)
    } catch (err) {
        next(err)
    }
}

const registerUser = async (req, res, next) => {
    try {
        const { username, email, password , role} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword , role})
        await user.save()
        const token = generateToken({ id: user._id, email: user.email, username: user.username , role:user.role})
        res.status(201).json({
            "message": "Usuario creado exitosamente",
            "token": token
        })
    } catch (err){
        next(err)
    }
}

const loginUser = async ( req, res, next) =>{
    try {
        const { email, username, password} = req.body
        const existingUser = await User.findOne({
            $or: [
                {email},
                {username}
            ]
        })

        console.log(existingUser)

        if (!existingUser) {
            res.status(400).json({ message: "Usuario incorrecto"})
        }

        const isMatch = await bcrypt.compare(password, existingUser?.password)

        if (!isMatch) {
            res.status(400).json({ message: "Contraseña incorrecta"})
        }

        const token = generateToken({ id: existingUser._id, email: existingUser.email, username: existingUser.username})
        res.status(201).json({
            "message": "Usuario logeado exitosamente",
            "token": token
        })
    } catch (err) {
        next(err)
    }
}

const updateDataUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const updateData = { ...req.body}
        console.log(updateData)
        const updateUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true}
        )
        if (!updateUser) {
            return res.status(400).json({
                message: "No se encontro el usuario por el ID ingresado"
            })
        }
        res.status(201).json({
            message: "El usuario fue actualizado",
            data: updateUser
        })
    } catch (err) {
        next(err)
    }
}

const deleteUserById = async (req, res, next) => {
    try {
         const { id } = req.params
         const deleteUsersById = await User.deleteOne({ _id: id})
         res.status(201).json(deleteUsersById)
    } catch (err) {
        next (err)
    }
}

export {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser,
    updateDataUser,
    deleteUserById
}