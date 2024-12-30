const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 
const authRoutes = require('./routes/auth'); 
const booksRoutes = require('./routes/books')
const librarianRoutes = require('./routes/librarian')

const app = express();
app.use(express.json());
app.use(cors()); 

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB', err));


app.use('/auth', authRoutes);
app.use('/librarian', librarianRoutes);
app.use('/books', booksRoutes); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/home.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});