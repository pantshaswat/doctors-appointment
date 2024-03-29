const mongoose  = require('mongoose')

const bloodBankSchema = new mongoose.Schema({
    bloodBankName: {
        type: String,
        required: true
    },
    bloodBankLocation: {
        type: String,
        required: true
    },
    bloodBankPhoneNumber: {
        type: String,
        required: true
    },
    bloodBankEmail: {
        type: String,
        required: true
    },
    bloodBankOpeningHours: {
        type: String,
        required: true
    },
    bloodBankClosingHours: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('bloodBank', bloodBankSchema);