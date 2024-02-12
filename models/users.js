/*
 * User: efebagri
 * Date/Time: 2/12/24, 2:58 AM
 * File: users.js
 *
 * Modified: 1/9/24, 2:40 PM
 *
 * Copyright (c) 2024 Exbil (https://www.exbil.net/)
 *    All rights Reserved.
 */

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
