const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true, // Ensures ISBN is unique
    trim: true
  },
  publisher: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  available: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create and export the model
module.exports = mongoose.model('Book', bookSchema);