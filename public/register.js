// js/register.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            // Collect form data
            const formData = new FormData(registerForm);
            const user = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            // Send data to backend
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Registration successful!');
                    window.location.href = 'login.html'; // Redirect to login page or another page
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});
