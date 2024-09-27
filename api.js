import express from 'express';  // Make sure to import express
import bodyParser from 'body-parser';  // Import body-parser if you haven't

const app = express();
const API_BASE_URL = 'http://localhost:3000/api';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Trackly-Bee API!');  // A simple message for the root path
});

// Your existing API fetch function
const apiFetch = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Example usage of fetchUser
const fetchUser = async (userId) => {
    return await apiFetch(`/users/${userId}`);
};

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
