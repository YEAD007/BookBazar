// frontend/js/dropdown.js

// Toggle the login form display
function toggleLoginForm() {
    const loginForm = document.getElementById('loginFormDropdown');
    loginForm.style.display = loginForm.style.display === 'block' ? 'none' : 'block';
}

// Close the login dropdown if clicking outside of it
window.onclick = function(event) {
    const loginForm = document.getElementById('loginFormDropdown');
    if (event.target !== document.querySelector('.login-btn') && !loginForm.contains(event.target)) {
        loginForm.style.display = 'none';
    }
};

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, role })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('userRole', role);
            localStorage.setItem('userId', data.userId);
            window.location.href = 'home.html'; // Redirect after successful login
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(err => console.error('Error:', err));
});
