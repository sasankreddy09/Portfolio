const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
