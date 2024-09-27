// backend/routes/expenses.js

import express from 'express';
import { addExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expenseController.js'; // Adjust path if needed
import authenticate from '../middleware/authenticate.js'; // Middleware to authenticate the user

const router = express.Router();

// Protect all routes with the authenticate middleware
router.post('/', authenticate, addExpense);   // Route to add an expense
router.get('/', authenticate, getExpenses);   // Route to get all expenses
router.put('/:id', authenticate, updateExpense); // Route to update an expense
router.delete('/:id', authenticate, deleteExpense); // Route to delete an expense

export default router;
