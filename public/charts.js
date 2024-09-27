import Chart from 'chart.js/auto';

const fetchExpenseData = async () => {
    try {
        const response = await fetch('/api/expenses', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await response.json();
        if (response.ok) {
            return result.expenses;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error fetching expense data:', error);
    }
};

const renderChart = async () => {
    const expenses = await fetchExpenseData();
    const ctx = document.getElementById('expenses-chart').getContext('2d');

    const chartData = {
        labels: expenses.map(exp => exp.category),
        datasets: [{
            label: 'Expenses by Category',
            data: expenses.map(exp => exp.amount),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});
