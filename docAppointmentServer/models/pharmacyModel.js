const mongoose = require('mongoose')

const pharmacySchema = new mongoose.Schema({
    pharmacyName: {
        type: String,
        required: true
    },
    pharmacyLocation: {
        type: String,
        required: true
    },
    pharmacyPhoneNumber: {
        type: String,
        required: true
    },
    pharmacyEmail: {
        type: String,
        required: true
    },
    pharmacyOpeningHours: {
        type: String,
        required: true
    },
    pharmacyClosingHours: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('pharmacy', pharmacySchema);