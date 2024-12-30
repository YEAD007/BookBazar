

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
            
            window.location.href = 'home.html'; 
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(err => console.error('Error:', err));
});
