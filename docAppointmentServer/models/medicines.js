const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
})

const medicine = mongoose.model('medicine',medicineSchema);

module.exports = medicine;
