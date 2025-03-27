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
