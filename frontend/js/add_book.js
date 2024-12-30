document.getElementById('addBookForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Capture form data
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  const publisher = document.getElementById('publisher').value;
  const quantity = document.getElementById('quantity').value; // Corrected ID

  console.log(`Request received. Book title: ${title}`);

  try {
      // Send data to backend
      const response = await fetch('http://localhost:3000/librarian/addBook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, author, isbn, publisher, quantity })
      });

      if (!response.ok) {
          throw new Error(`Failed to add book: ${response.status}`);
      }

      const data = await response.json();

      // Display the server response
      const message = document.getElementById('message');
      message.textContent = data.message;

      // Redirect to books.html on success
      if (response.ok) {
          window.location.href = 'books.html';
      }
  } catch (error) {
      console.error('Error adding book:', error);

      // Display error message to user
      const message = document.getElementById('message');
      message.textContent = 'An error occurred while adding the book. Please try again.';
  }
});
