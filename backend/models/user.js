const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'librarian']
    },
    // Student-specific fields
    studentRoll: {
        type: String,
        required: function() {
            return this.role === 'student'; // Required only for students
        },
        unique: true // Ensure unique roll number
    },
    studentName: {
        type: String,
        required: function() {
            return this.role === 'student'; // Required only for students
        }
    },
    studentCourse: {
        type: String,
        required: function() {
            return this.role === 'student'; // Required only for students
        }
    },
    studentSemester: {
        type: String,
        required: function() {
            return this.role === 'student'; // Required only for students
        }
    }
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare the password for login
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
