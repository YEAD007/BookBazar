// backend/models/request.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming `User` model stores student information
        required: true
    },
    requestedAt: {
        type: Date,
        default: Date.now
    },
    isIssued: {
        type: Boolean,
        default: false
    },
    issuedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Request', requestSchema);
