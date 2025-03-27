const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    money: {
        type: Number,
        default: 0,
    },
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;
