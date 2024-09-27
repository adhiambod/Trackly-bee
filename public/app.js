document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for forms
    const addExpenseForm = document.getElementById('add-expense-form');
    if (addExpenseForm) {
        addExpenseForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Collect form data
            const data = new FormData(addExpenseForm);
            const expense = Object.fromEntries(data.entries());
            
            // Send data to backend
            try {
                const response = await fetch('/api/expenses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(expense)
                });
                const result = await response.json();
                if (response.ok) {
                    alert('Expense added successfully!');
                    addExpenseForm.reset();
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    // Handle login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(loginForm);
            const credentials = Object.fromEntries(data.entries());
            
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                });
                const result = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', result.token);
                    alert('Login successful!');
                    window.location.href = 'index.html';
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    // Fetch and display expenses
    const fetchExpenses = async () => {
        try {
            const response = await fetch('/api/expenses', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const result = await response.json();
            if (response.ok) {
                const tableBody = document.querySelector('#expenses-table tbody');
                tableBody.innerHTML = '';
                result.expenses.forEach(expense => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${expense.date}</td>
                        <td>${expense.amount}</td>
                        <td>${expense.category}</td>
                        <td>${expense.description}</td>
                        <td><button onclick="editExpense(${expense.id})">Edit</button></td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                console.error(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchExpenses();
});
