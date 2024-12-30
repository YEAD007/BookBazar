// Fetch and display books in the table
document.addEventListener('DOMContentLoaded', () => {
    console.log("request foubd");
    fetch('http://localhost:3000/books') // Backend route to fetch books
    
        .then(response => {
            console.log(`Insdie the get request and the response if from first then`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(books => {
            console.log(`Insdie the get request and the response if from second then`);
            const booksTableBody = document.getElementById('booksTable').getElementsByTagName('tbody')[0];
            books.forEach(book => {
                const row = booksTableBody.insertRow();
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td>${book.publisher}</td>
                    <td>${book.quantity}</td>
                `;
            });
        })
        .catch(error => console.error('Error fetching books:', error));
});
