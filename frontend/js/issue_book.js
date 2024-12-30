// Fetch issued books from server
async function fetchIssuedBooks() {
    try {
        const response = await fetch('http://localhost:3000/books/issued-books');
        const issuedBooks = await response.json();
        renderIssuedBooks(issuedBooks);
    } catch (err) {
        console.error('Error fetching issued books:', err);
    }
}

// Render issued books in the table
function renderIssuedBooks(books) {
    const tbody = document.querySelector('#issuedBooksTable tbody');
    tbody.innerHTML = ''; // Clear previous entries

    books.forEach(request => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${request.bookId.title}</td>
            <td>${request.bookId.author}</td>
            <td>${request.studentId.name}</td>
            <td>${new Date(request.requestDate).toLocaleDateString()}</td>
        `;

        tbody.appendChild(row);
    });
}

// Load issued books when the page loads
window.onload = fetchIssuedBooks;
