/*
 * User: efebagri
 * Date/Time: 2/12/24, 2:58 AM
 * File: mongoose.js
 *
 * Modified: 1/9/24, 2:40 PM
 *
 * Copyright (c) 2024 Exbil (https://www.exbil.net/)
 *    All rights Reserved.
 */

const mongoose = require('mongoose');

module.exports = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to Database');

    require('../models/users');
    require('../models/workCooldown');
}
