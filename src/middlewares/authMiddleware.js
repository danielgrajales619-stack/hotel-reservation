import jwt from 'jsonwebtoken'
import { User } from '../models/users.js';
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    if ( err.name === "tokenExpireError")
        return res.status(401).json({ message: "Token expirado"})
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
export default authMiddleware