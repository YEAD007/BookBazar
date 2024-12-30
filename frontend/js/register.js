document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const studentRoll = document.getElementById('studentRoll').value;
    const studentName = document.getElementById('studentName').value;
    const studentCourse = document.getElementById('studentCourse').value;
    const studentSemester = document.getElementById('studentSemester').value;

    // console.log({
    //     username,
    //     password,
    //     role: 'student', // Default role
    //     studentRoll,
    //     studentName,
    //     studentCourse,
    //     studentSemester
    // });
    
    fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            role: 'student', // Default role
            studentRoll,
            studentName,
            studentCourse,
            studentSemester
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'User registered') {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(err => console.error('Error:', err));
});
