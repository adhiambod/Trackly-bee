// backend/middleware/authenticate.js

import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Correct import path to the User model

const authenticate = async (req, res, next) => {
    // Extract token from the authorization header
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID from the decoded token
        req.user = await User.findByPk(decoded.id);

        // If user is found, proceed
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authenticate;
