// frontend/js/book_request.js

// Fetch books from server
async function fetchBooks(title = '') {
    try {
        const response = await fetch(`http://localhost:3000/books?title=${title}`);
        const books = await response.json();
        renderBooks(books);
    } catch (err) {
        console.error('Error fetching books:', err);
    }
}

// Render books in the table
function renderBooks(books) {
    const tbody = document.querySelector('#booksTable tbody');
    tbody.innerHTML = ''; // Clear previous entries

    books.forEach(book => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.quantity}</td>
            <td>
                <button onclick="requestBook('${book._id}')" ${book.quantity > 0 ? '' : 'disabled'}>
                    Request
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Handle book request
async function requestBook(bookId) {
    //const studentId = 'sampleStudentId'; // Replace with actual student ID if available
    //const studentId = localStorage.getItem('studentId'); // Assuming studentId is stored in localStorage on login
    const studentId = localStorage.getItem('userId'); // Retrieve the student ID from local storage
    if (!studentId) {
        alert('Error: Student ID not found. Please log in again.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/books/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookId, studentId })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            fetchBooks(); // Refresh book list
        } else {
            alert(`Request failed: ${data.message}`);
        }
    } catch (err) {
        console.error('Error requesting book:', err);
    }
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const title = e.target.value;
    fetchBooks(title); // Fetch books with search filter
});

// Initial fetch
fetchBooks();


