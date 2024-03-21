const mongoose = require('mongoose');

const patientRecordSchema = new mongoose.Schema({
    patientUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true
    },
    allocatedDepartment:{
        type: String,
        enum:['Cardiology','Urology','Medicine','Oncology','Orthopedics']
    },
    medicalCondition:{
        type: String,
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        enum:['Male','Female','Other']
    },

});

const patientRecord = mongoose.model('patientRecord', patientRecordSchema);

module.exports = patientRecord;