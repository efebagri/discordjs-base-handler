/*
 * User: efebagri
 * Date/Time: 2/12/24, 2:58 AM
 * File: workCooldown.js
 *
 * Modified: 1/9/24, 2:40 PM
 *
 * Copyright (c) 2024 Exbil (https://www.exbil.net/)
 *    All rights Reserved.
 */

const mongoose = require('mongoose');

const cooldownSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        cooldownExpiration: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

const Cooldown = mongoose.model('Cooldown', cooldownSchema);

module.exports = Cooldown;
