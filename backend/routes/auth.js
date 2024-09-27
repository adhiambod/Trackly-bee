// backend/routes/auth.js

import express from 'express';
import { register, login } from '../controllers/authController.js'; // Adjust the path if necessary

const router = express.Router();

// Register endpoint
router.post('/register', register);

// Login endpoint
router.post('/login', login);

export default router;
