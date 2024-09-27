import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';
import { sequelize } from './models/index.js'; // Ensure this matches your actual export in models/index.js

dotenv.config();

// Log environment variables
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(3000, async () => {
    console.log('Server running on port 3000');
    try {
        await sequelize.sync(); // Ensure this line is correct according to your sequelize instance
        console.log('Database synced');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
});
