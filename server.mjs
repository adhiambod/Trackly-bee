// server.mjs

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './backend/routes/auth.js'; // Ensure this path is correct
import expenseRoutes from './backend/routes/expenses.js'; // Ensure this path is correct
import { sequelize } from './backend/models/index.js'; // Ensure this path is correct

// Log the current directory for debugging
console.log('Current directory:', path.dirname(fileURLToPath(import.meta.url)));

dotenv.config();

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Simple test route to check if the server is running
app.get('/test', (req, res) => {
    res.send('Test endpoint is working!');
});

// Start the server and sync the database
const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified
app.listen(PORT, async () => {
    try {
        await sequelize.sync(); // Sync the database
        console.log(`Database synced and server running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to sync database:', error);
    }
});
