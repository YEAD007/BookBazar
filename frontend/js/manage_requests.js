// frontend/js/manage_requests.js

document.addEventListener('DOMContentLoaded', async () => {
    await fetchRequests();
});

async function fetchRequests() {
    try {
        const response = await fetch('http://localhost:3000/librarian/requests');
        const requests = await response.json();
        
        const tbody = document.getElementById('requestsTable').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Clear any existing rows

        requests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.book.title}</td>
                <td>${request.student.name}</td>
                <td>${new Date(request.requestedAt).toLocaleDateString()}</td>
                <td>${request.isIssued ? 'Issued' : 'Pending'}</td>
                <td>
                    ${request.isIssued ? 'Already Issued' : `<button onclick="issueBook('${request._id}')">Issue Book</button>`}
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

async function issueBook(requestId) {
    try {
        const response = await fetch(`http://localhost:3000/librarian/requests/${requestId}/issue`, {
            method: 'PUT'
        });
        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            fetchRequests(); // Refresh the list after issuing the book
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error issuing book:', error);
    }
}
