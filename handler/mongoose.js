const mongoose = require('mongoose');

module.exports = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to Database');

    require('../models/users');
    require('../models/workCooldown');
}
