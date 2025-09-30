import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = ( payload, expiresIn = '15h') => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn })
}