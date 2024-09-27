import db from '../models/index.js';

const { Expense, User } = db;

// Add a new expense
export const addExpense = async (req, res) => {
    try {
        // Assuming req.body contains all necessary fields for creating an expense
        const expense = await Expense.create({
            ...req.body,
            userId: req.user.id, // Ensure userId is associated with the current user
        });
        res.status(201).json({ message: 'Expense added', expense });
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
};

// Get all expenses for a user
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll({ where: { userId: req.user.id } });
        res.json({ expenses });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
};

// Update an existing expense
export const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByPk(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        await expense.update(req.body);
        res.json({ message: 'Expense updated', expense });
    } catch (error) {
        res.status(500).json({ message: 'Error updating expense', error });
    }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByPk(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        await expense.destroy();
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error });
    }
};
