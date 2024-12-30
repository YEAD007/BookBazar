

function loadNavLinks() {
    const navLinks = document.getElementById('navLinks');
    const userRole = localStorage.getItem('userRole'); // Assuming role is stored in localStorage after login

    


    navLinks.innerHTML = '';

    if (userRole === 'student') {
       
        navLinks.innerHTML = `
            <li><a href="books.html">View Books</a></li>
            <li><a href="book_request.html">Request Book</a></li>
            <li><a href="my_requests.html">My Requests</a></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        `;
    } else if (userRole === 'librarian') {
    
        navLinks.innerHTML = `
            <li><a href="manage_requests.html">Manage Requests</a></li>
            <li><a href="add_book.html">Add Book</a></li>
            <li><a href="issue_book.html">Issue Book</a></li>
            <li><a href="logs.html">View Logs</a></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        `;
    }
     else {
        
        navLinks.innerHTML = `
            <li><a href="register.html">Register</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="books.html">View Books</a></li>
        `;
    }
}


function logout() {
    localStorage.removeItem('userRole'); // Clear user role from local storage
    window.location.href = 'login.html';
}